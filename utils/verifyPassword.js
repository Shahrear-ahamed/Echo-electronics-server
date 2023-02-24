const bcrypt = require("bcryptjs");

const verifyPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

module.exports = verifyPassword;
