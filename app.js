const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

// security middleware libraries

const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");

// Routes imports
// const userRouter = require("./routers/v2/user.router");
// const OAuthRouter = require("./routers/v2/OAuth.router");
const inventoryRouter = require("./routers/v2/inventory.router");

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

// other versions router are here

// app.use("/api/v2/user/", userRouter);
// app.use("/api/v2/auth/", OAuthRouter);
app.use("/api/v2/inventory/products", inventoryRouter);

// Routes
app.use("/", (req, res) => {
  res.status(200).json({ status: "success", message: "Welcome to the API" });
});

// Error handling
app.use("*", (req, res) => {
  res.status(404).json({ status: "failed", message: "Not Data Found" });
});

module.exports = app;
