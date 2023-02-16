const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name must be required"],
    },
    email: {
      type: String,
      trim: true,
      unique: [true, "email should be unique"],
      required: [true, "Email must be required"],
    },
    role: {
      type: String,
      default: "user",
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Confirm password must be required"],
      minLength: 8,
    },
    confirmPassword: {
      type: String,
      trim: true,
      required: [true, "Confirm password must be required"],
      minLength: 8,
    },
  },
  { timestamps: true, versionKey: false }
);

userSchema.pre("save", function (next) {
  this.role = "user";

  if (this.password !== this.confirmPassword)
    throw new Error("Password and Confirm Password must be the same");

  // make hash password
  const hashed = bcrypt.hashSync(this.password, 10);

  this.password = hashed;
  this.confirmPassword = undefined;

  next();
});

// compare password
userSchema.methods.comparePassword = async function (
  rowPassword,
  hashPassword
) {
  return await bcrypt.compare(rowPassword, hashPassword);
};

const User = model("User", userSchema);

module.exports = User;
