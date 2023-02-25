const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    authId: {
      type: String,
      default: null,
      immutable: true,
    },
    name: {
      type: String,
      trim: true,
      required: [true, "Name must be required"],
    },
    email: {
      type: String,
      trim: true,
      immutable: true,
      unique: [true, "email should be unique"],
      required: [true, "Email must be required"],
    },
    role: {
      type: String,
      default: "user",
    },
    provider: {
      type: String,
      trim: true,
      default: "local",
      immutable: true,
    },
    photo: {
      type: String,
      trim: true,
      default: null,
      minLength: 0,
      maxLength: 1000,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      trim: true,
      minLength: 8,
    },
    confirmPassword: {
      type: String,
      trim: true,
      minLength: 8,
    },
  },
  { timestamps: true, versionKey: false }
);

userSchema.pre("save", function (next) {
  this.role = "user";

  // if provider is local then check password and confirm password
  if (this.provider === "local") {
    // check password and confirm password

    if (!this.password || !this.confirmPassword)
      throw new Error("Password must be required");

    if (this.password !== this.confirmPassword)
      throw new Error("Password and Confirm Password must be the same");

    // make hash password
    const hashed = bcrypt.hashSync(this.password, 10);

    this.password = hashed;
    this.confirmPassword = undefined;
  }

  next();
});

const User = model("User", userSchema);

module.exports = User;
