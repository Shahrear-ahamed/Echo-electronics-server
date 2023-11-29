const jwt = require("jsonwebtoken");

const jwtToken = {};

jwtToken.createToken = (user) => {
  const payload = {
    id: user?._id,
    role: user?.role,
    email: user?.email,
    name: user?.name,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7d",
    algorithm: "HS512",
  });

  return token;
};

jwtToken.verifyToken = (req, res, next) => {
  const userToken = req.headers.authorization;
  console.log(userToken);
  if (!userToken) {
    return res.status(401).send({ message: "Unauthorized Access" });
  }
  const token = userToken.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
    if (err) {
      return res.status(403).send({ message: "Forbidden Access" });
    }
    req.decode = decode;
    next();
  });
};

module.exports = jwtToken;
