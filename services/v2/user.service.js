const User = require("../../models/users.model");

const userService = {};

userService.createUserService = async (userData) => {
  return await User.create(userData);
};

userService.loginUserService = async (email) => {
  return await User.findOne({ email });
};

module.exports = userService;
