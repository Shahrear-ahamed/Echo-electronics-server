// service are here
const {
  createUserService,
  findUserEmailService,
  findUserGoogleService,
  createUserGoogleService,
} = require("../services/v2/user.service");

// token are here
const { createToken } = require("../middlewares/jwtToken");

const userController = {};

userController.createUser = async (req, res) => {
  try {
    const userData = req.body;

    const result = await createUserService(userData);

    // if user already exist throw error
    if (!result) throw new Error("User already exist");

    const token = await createToken(result);

    res.status(200).json({
      status: "success",
      message: "User created",
      token: "Bearer " + token,
    });
  } catch (err) {
    res.status(500).json({ status: "failed", message: err.message });
  }
};

userController.loginUser = async (req, res) => {
  try {
    const userEmail = req.body.email;
    const userPassword = req.body.password;

    const result = await findUserEmailService(userEmail);

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

    res.status(200).json({
      status: "success",
      message: "User logged in",
      token: "Bearer " + token,
    });
  } catch (err) {
    res.status(500).json({ status: "failed", message: err.message });
  }
};

userController.authGoogleUser = async (req, res) => {
  try {
    const user = req.user;

    const result = await findUserGoogleService(user.authId, user.email);

    // if user already exist login user
    if (result) {
      const token = await createToken(result);
      return res.status(200).json({
        status: "success",
        message: "User logged in",
        token: "Bearer " + token,
      });
    }

    // if user not exist create user
    const createdUser = await createUserGoogleService(user);

    if (!createdUser) throw new Error("Something occurred while creating user");

    const token = await createToken(createdUser);

    res
      .status(200)
      .json({
        status: "success",
        message: "Google Auth Done",
        token: "Bearer " + token,
      });
  } catch (err) {
    res.status(500).json({ status: "failed", message: err.message });
  }
};

module.exports = userController;
