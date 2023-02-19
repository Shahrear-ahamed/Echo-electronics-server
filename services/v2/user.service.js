const User = require("../../models/users.model");

const userService = {};

// make password hash service
userService.createUserService = async (userData) => {
  return await User.create(userData);
};

userService.findUserEmailService = async (email) => {
  return await User.findOne({ email });
};

// make auth google service
userService.findUserGoogleService = async (userData) => {
  return await User.create(userData);
};

userService.findUserGoogleService = async (gId, email) => {
  return await User.findOne({ gId, email });
};

// make auth facebook service

module.exports = userService;
