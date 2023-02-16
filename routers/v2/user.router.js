const router = require("express").Router();

// import controllers
const { createUser, loginUser } = require("../../controllers/user.controller");

// routes
router.post("/login", loginUser);
router.post("/register", createUser);

module.exports = router;
