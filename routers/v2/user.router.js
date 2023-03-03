const router = require("express").Router();
const { verifyToken } = require("../../middlewares/jwtToken");

// import controllers
const {
  loginUser,
  createUser,
  getUserProfile,
  updateUserProfile,
  updateUserPassword,
} = require("../../controllers/user.controller");

// routes
router.get("/", verifyToken, getUserProfile).post("/login", loginUser);
router.post("/register", createUser);
router.post("/profile", verifyToken, updateUserProfile);
router.post("/password", verifyToken, updateUserPassword);

module.exports = router;
