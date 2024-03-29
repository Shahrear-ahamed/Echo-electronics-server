const app = require("./oldApp");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const port = process.env.PORT || 5000;

const verifyToken = (req, res, next) => {
  const userToken = req.headers.authorization;
  if (!userToken) {
    return res.status(401).send({ message: "Unauthorized Access" });
  }
  const token = userToken.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, decode) => {
    if (err) {
      return res.status(403).send({ message: "Forbidden Access" });
    }
    req.decode = decode;
    next();
  });
};

// add mongodb server
const uri = "";
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.evmzgwb.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// server api making code are here
const run = async () => {
  // database running here
  try {
    await client.connect();
    const adminCollection = client
      .db("echoElectronics")
      .collection("adminUser");
    const productCollection = client
      .db("echoElectronics")
      .collection("products");
    const agreementCollection = client
      .db("echoElectronics")
      .collection("agreementRegister");

    /**
     * ----------------------------------------------------
     * ------------------------ HOLA ----------------------
     *
     *          Make json toke are from here
     *
     * ------------------------ HOLA ----------------------
     * ----------------------------------------------------
     */

    // get and check token
    app.post("/generatetoken", async (req, res) => {
      const email = req.body;
      const jwToken = jwt.sign(email, process.env.ACCESS_TOKEN, {
        expiresIn: "1d",
      });
      res.send({ jwToken });
    });

    /**
     * ----------------------------------------------------
     * ------------------------ HOLA ----------------------
     *
     *  crud operations are here and make some api for this
     *
     * ------------------------ HOLA ----------------------
     * ----------------------------------------------------
     */

    // get homepage items from here
    app.get("/homeitems", async (req, res) => {
      const homeProduct = parseInt(req.query.limit);
      const query = {};
      const cursor = productCollection.find(query);
      const result = await cursor.limit(homeProduct).toArray();
      res.send(result);
    });

    // get total product in warehouse
    app.get("/inventorycount", async (req, res) => {
      const totalProduct = await productCollection.estimatedDocumentCount();
      res.send({ totalProduct });
    });

    // post product
    app.post("/inventory", async (req, res) => {
      const item = req.body;
      const result = await productCollection.insertOne(item);
      res.send(result);
    });

    app.get("/userstoredata", async (req, res) => {
      const email = req.query.email;
      const query = { email };
      const result = await productCollection.find(query).toArray();
      res.send({ result: result.length });
    });

    // get my items
    app.get("/inventory", async (req, res) => {
      const items = parseInt(req.query.items);
      const page = parseInt(req.query.page);
      const query = {};
      const result = await productCollection
        .find(query)
        .skip(items * page)
        .limit(items)
        .toArray();
      res.send(result);
    });

    // get items and show by user email only
    app.get("/singleuser", verifyToken, async (req, res) => {
      const decodeEmail = req.decode.email;
      const email = req.query.email;
      const items = parseInt(req.query.items);
      const page = parseInt(req.query.page);
      if (decodeEmail === email) {
        const query = { email };
        const result = await productCollection
          .find(query)
          .skip(items * page)
          .limit(items)
          .toArray();
        res.send(result);
      } else {
        res.status(401).send("Forbidden Access");
      }
    });

    // get single item
    app.get("/inventory/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await productCollection.findOne(query);
      res.send(result);
    });

    // update single item
    app.put("/inventory/:id", async (req, res) => {
      const id = req.params.id;
      const body = req.body;
      const query = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateData = {
        $set: body,
      };
      const result = await productCollection.updateOne(
        query,
        updateData,
        options
      );
      res.send(result);
    });

    // delete items
    app.delete("/inventory/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await productCollection.deleteOne(query);
      res.send(result);
    });

    // get agreement data and save to database
    app.post("/warehouseagreement", async (req, res) => {
      const agreement = req.body;
      const result = await agreementCollection.insertOne(agreement);
      res.send(result);
    });
  } finally {
    // await client.close();
  }
};
run().catch(console.dir);

// run server from here
app.listen(port, () => {
  console.log(`Echo server listening here... ${port}`);
});
