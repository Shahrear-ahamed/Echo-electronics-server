const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const port = process.env.PORT || 5000;

// middle ware
app.use(cors());
app.use(express.json());

// server api making code are here

// server start are here
app.get("/", (req, res) => {
  res.send("Echo Electronics server are start");
});

// run server from here
app.listen(port, () => {
  console.log(`Echo server listening here..... ${port}`);
});
