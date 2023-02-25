const router = require("express").Router();
const { verifyToken } = require("../../middlewares/jwtToken");

// import controllers
const {
  createUser,
  loginUser,
  getUserProfile,
} = require("../../controllers/user.controller");

// routes
router.get("/", verifyToken, getUserProfile).post("/login", loginUser);
router.post("/register", createUser);

module.exports = router;
