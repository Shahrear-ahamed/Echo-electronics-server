const router = require("express").Router();

// import controllers
const { createUser } = require("../../controllers/user.controller");

// routes
router.route("/").post(createUser);

module.exports = router;
