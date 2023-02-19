const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const strategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET_ID,
    callbackURL: "http://localhost:5000/api/v2/auth/google/redirect",
  },
  (accessToken, refreshToken, profile, cb) => {
    const userDetails = { ...profile?._json };

    if (profile?.id) return cb(null, userDetails);
  }
);

passport.use(strategy);
