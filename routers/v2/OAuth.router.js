const router = require("express").Router();
const passport = require("passport");
const { authGoogleUser } = require("../../controllers/user.controller");

// call strategy
require("../../config/OAuthPassport.config");

// user click and process start from here
// http://localhost:5000/api/v2/auth/google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("login/success", (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
    });
  }
});

router.get("login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "user failed to authenticate",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});

// after auth process done, user will be redirected to this route
// http://localhost:5000/api/v2/auth/google/redirect
router.get(
  "/google/redirect",
  passport.authenticate("google", {
    session: false,
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  }),
  authGoogleUser
);

module.exports = router;
