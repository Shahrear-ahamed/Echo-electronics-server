const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const port = process.env.PORT || 5000;

// middle ware
app.use(cors());
app.use(express.json());

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
      console.log(jwToken);
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
