const User = require("../../models/users.model");
const { Types } = require("mongoose");

const userService = {};

// make password hash service
userService.createUserService = async (userData) => {
  return await User.create(userData);
};

userService.findUserService = async (email) => {
  const users = await User.aggregate([{ $match: { email } }]);
  return users[0];
};

userService.findUserForInternalService = async (id) => {
  const userId = new Types.ObjectId(id);
  const users = await User.aggregate([
    { $match: { _id: userId } },
    { $project: { authId: 0, createdAt: 0, updatedAt: 0 } },
  ]);
  return users[0];
};

userService.findUserByIdService = async (id) => {
  const userId = new Types.ObjectId(id);
  const users = await User.aggregate([
    { $match: { _id: userId } },
    { $project: { password: 0, authId: 0, createdAt: 0, updatedAt: 0 } },
  ]);
  return users[0];
};

userService.updateUserService = async (id, userData) => {
  return await User.updateOne({ _id: id }, userData, { runValidators: true });
};

module.exports = userService;
