const jwt = require("jsonwebtoken");

const jwtToken = {};

jwtToken.createToken = (user) => {
  const payload = {
    id: user?._id,
    email: user?.email,
  };

  const token = jwt.sign(payload, process.env.JWT_TOKEN, { expiresIn: "7d" });

  return `Bearer ${token}`;
};

jwtToken.verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_TOKEN);
};

module.exports = jwtToken;
