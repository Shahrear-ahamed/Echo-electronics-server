const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// google strategy configuration
const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET_ID,
    callbackURL: "http://localhost:5000/api/v2/auth/google/redirect",
  },
  (accessToken, refreshToken, profile, cb) => {
    const userDetails = {
      authId: profile?.id,
      name: profile?.displayName,
      provider: profile?.provider,
      verified: profile?.emails[0]?.verified,
      email: profile?.emails[0]?.value,
      photo: profile?.photos[0]?.value,
    };

    if (profile?.id) return cb(null, userDetails);
  }
);

passport.use(googleStrategy);
