const User = require("../../models/users.model");

const userService = {};

// make password hash service
userService.createUserService = async (userData) => {
  return await User.create(userData);
};

userService.findUserEmailService = async (email) => {
  const users = await User.aggregate([{ $match: { email } }]);
  return users[0];
};

// make auth google service
userService.findUserGoogleService = async (email) => {
  const users = await User.aggregate([{ $match: { email } }]);
  return users[0];
};

userService.createUserGoogleService = async (userData) => {
  return await User.create(userData);
};

module.exports = userService;
