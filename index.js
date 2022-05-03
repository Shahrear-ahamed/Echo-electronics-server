const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const port = process.env.PORT || 5000;

// middle ware
app.use(cors());
app.use(express.json());

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
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uceta.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// server api making code are here
const run = async () => {
  // database runing here
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

    // get and check token
    app.post("/generatetoken", async (req, res) => {
      const email = req.body;
      const jwToken = jwt.sign(email, process.env.ACCESS_TOKEN, {
        expiresIn: "1d",
      });
      res.send({ jwToken });
    });

    // crud operations are here and make some api for this

    // get homepage items from here
    app.get("/homeitems", async (req, res) => {
      const homeProduct = parseInt(req.query.limit);
      const query = {};
      const cursor = productCollection.find(query);
      const result = await cursor.limit(homeProduct).toArray();
      res.send(result);
    });
    // get all items for manage inventory page and single person
    app.get("/inventory", async (req, res) => {
      const query = {};
      const cursor = productCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    // post product
    app.post("/inventory", async (req, res) => {
      const item = req.body;
      const result = await productCollection.insertOne(item);
      res.send(result);
    });

    // delete items
    app.delete("/inventory/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await productCollection.deleteOne(query);
      res.send(result);
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
      console.log(body, id);
      const result = await productCollection.updateOne(
        query,
        updateData,
        options
      );
      res.send(result);
    });
  } finally {
    // await client.close();
  }
};
run().catch(console.dir);

// server start are here
app.get("/", (req, res) => {
  res.send("Echo Electronics server are start");
});

// run server from here
app.listen(port, () => {
  console.log(`Echo server listening here..... ${port}`);
});
