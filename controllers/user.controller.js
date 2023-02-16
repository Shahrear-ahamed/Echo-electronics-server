// service are here
const userService = require("../services/v2/user.service");

const userController = {};

userController.createUser = async (req, res) => {
  try {
    const userData = req.body;

    const result = await userService.createUserService(userData);

    console.log(result);

    res.status(200).json({ status: "success", message: "User created" });
  } catch (err) {
    res.status(500).json({ status: "failed", message: err.message });
  }
};

module.exports = userController;
