// service are here
const userService = require("../services/v2/user.service");

// token are here
const { createToken, verifyToken } = require("../middlewares/jwtToken");

const userController = {};

userController.createUser = async (req, res) => {
  try {
    const userData = req.body;

    const result = await userService.createUserService(userData);

    // if user already exist throw error
    if (!result) throw new Error("User already exist");

    const token = await createToken(result);

    res.status(200).json({ status: "success", message: "User created", token });
  } catch (err) {
    res.status(500).json({ status: "failed", message: err.message });
  }
};

userController.loginUser = async (req, res) => {
  try {
    const userEmail = req.body.email;
    const userPassword = req.body.password;

    const result = await userService.loginUserService(userEmail);

    // if not user found throw error
    if (!result) throw new Error("User not found");

    const compared = await result.comparePassword(
      userPassword,
      result.password
    );

    // if password not match throw error
    if (!compared) throw new Error("Email or Password not match");

    // create token
    const token = await createToken(result);

    res
      .status(200)
      .json({ status: "success", message: "User logged in", token });
  } catch (err) {
    res.status(500).json({ status: "failed", message: err.message });
  }
};

module.exports = userController;
