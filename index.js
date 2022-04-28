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



// server start are here
app.get("/", (req, res) => {
  res.send("Echo Electronics server are start");
});

// run server from here
app.listen(port, () => {
  console.log(`Echo server listening here..... ${port}`);
});
