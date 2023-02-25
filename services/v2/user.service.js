const User = require("../../models/users.model");

const userService = {};

// make password hash service
userService.createUserService = async (userData) => {
  return await User.create(userData);
};

userService.findUserService = async (email) => {
  const users = await User.aggregate([{ $match: { email } }]);
  return users[0];
};

userService.findUserByEmailService = async (email) => {
  const users = await User.aggregate([
    { $match: { email } },
    { $project: { password: 0, authId: 0, createdAt: 0, updatedAt: 0 } },
  ]);
  return users[0];
};

module.exports = userService;
