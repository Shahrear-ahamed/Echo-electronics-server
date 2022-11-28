const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

// middle ware
app.use(cors());
app.use(express.json());

// server start are here
app.get("/", (req, res) => {
  res.send("Echo Electronics server are start");
});

module.exports = app;
