const User = require("../../models/users.model");

const userService = {};

// make password hash service
userService.createUserService = async (userData) => {
  return await User.create(userData);
};

userService.findUserEmailService = async (email) => {
  return await User.aggregate([{ $match: { email } }]);
};

// make auth google service
userService.findUserGoogleService = async (authId, email) => {
  return await User.findOne({ authId, email });
};

userService.createUserGoogleService = async (userData) => {
  return await User.create(userData);
};

module.exports = userService;
