// service are here
const {
  findUserService,
  updateUserService,
  createUserService,
  findUserByIdService,
  findUserByEmailService,
} = require("../services/v2/user.service");

// token are here
const { createToken } = require("../middlewares/jwtToken");
const verifyPassword = require("../utils/verifyPassword");

const userController = {};

userController.createUser = async (req, res) => {
  try {
    const userData = req.body;

    const result = await createUserService(userData);

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

    const result = await findUserService(userEmail);

    // if not user found throw error
    if (!result) throw new Error("User not found");

    const compared = await verifyPassword(userPassword, result.password);

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

userController.authGoogleUser = async (req, res) => {
  try {
    const user = req.user;

    const result = await findUserService(user.email);

    // if user already another provider user then return error
    if (result.provider !== "google") {
      throw new Error("User already exist");
    }

    // if user already exist login user
    if (result.provider === "google") {
      const token = await createToken(result);
      return res
        .status(200)
        .json({ status: "success", message: "User logged in", token });
    }

    // if user not exist create user
    const createdUser = await createUserService(user);

    if (!createdUser) throw new Error("Something occurred while creating user");

    const token = await createToken(createdUser);

    res
      .status(200)
      .json({ status: "success", message: "Google Auth Done", token });
  } catch (err) {
    res.status(500).json({ status: "failed", message: err.message });
  }
};

userController.getUserProfile = async (req, res) => {
  try {
    const id = req.decode.id;
    const user = await findUserByIdService(id);

    if (!user) throw new Error("User not found");

    res.status(200).json({ status: "success", message: "User profile", user });
  } catch (err) {
    res.status(500).json({ status: "failed", message: err.message });
  }
};

userController.updateUserProfile = async (req, res) => {
  try {
    const id = req.decode.id;
    const userData = req.body;

    // security layer 1
    // find user details for security purpose and check if user data are available
    const user = await findUserByIdService(id);
    if (!user) throw new Error("User not found");

    // now change user credentials
    // user cant change email, authId, provider

    const result = await updateUserService(user._id, userData);

    if (result.modifiedCount === 0) throw new Error("User not updated");

    res
      .status(200)
      .json({ status: "success", message: "User profile updated", result });
  } catch (err) {
    res.status(500).json({ status: "failed", message: err.message });
  }
};

module.exports = userController;
