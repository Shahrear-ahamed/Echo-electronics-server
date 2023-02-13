const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

// security middleware libraries

const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");

// Routes imports

// Middleware
app.use(cors());
app.use(bodyParser.json());

// express middleware
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

// security middleware
app.use(mongoSanitize());

// rate limit
app.use(
  rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

// Routes
app.use("/", (req, res) => {
  res.status(200).json({ status: "success", message: "Welcome to the API" });
});

// other versions router are here

// Error handling
app.use("*", (req, res) => {
  res.status(404).json({ status: "failed", message: "Not Data Found" });
});

module.exports = app;
