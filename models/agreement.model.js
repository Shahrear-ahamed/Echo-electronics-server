const { Schema, model } = require("mongoose");

const agreementSchema = new Schema(
  {
    companyName: {
      type: String,
      trim: true,
      minLength: 0,
      maxLength: 25,
      required: [true, "Company name must be required"],
    },
    email: {
      type: String,
      trim: true,
      minLength: 0,
      maxLength: 30,
      required: [true, "Supplier mail must be required"],
    },
    agreementYear: {
      type: String,
      trim: true,
      required: [true, "Quantity must be required"],
    },
    message: {
      type: String,
      trim: true,
      minLength: 0,
      maxLength: 1000,
      required: [true, "Message must be required"],
    },
    number: {
      type: Number,
      trim: true,
      required: [true, "Contact number must be required"],
      validate: {
        validator: Number.isInteger,
        message: "{VALUE} is not an integer value",
      },
    },
  },
  { timestamps: true, versionKey: false }
);

const Agreement = model("Agreement", agreementSchema);

module.exports = Agreement;
