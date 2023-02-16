const User = require("../../models/users.model");

const userService = {};

userService.createUserService = async (userData) => {
  return await User.create(userData);
};

module.exports = userService;
