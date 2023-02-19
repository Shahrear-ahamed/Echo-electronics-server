const router = require("express").Router();
const passport = require("passport");
const { authGoogleUser } = require("../../controllers/user.controller");

// call strategy
require("../../config/OAuthPassport.config");

// user click and process start from here
// http://localhost:5000/api/v2/auth/google
router
  .route("/google")
  .get(passport.authenticate("google", { scope: ["profile", "email"] }));

// after google auth process done, user will be redirected to this route
// http://localhost:5000/api/v2/auth/google/redirect
router
  .route("/google/redirect")
  .get(passport.authenticate("google", { session: false }), authGoogleUser);

module.exports = router;
