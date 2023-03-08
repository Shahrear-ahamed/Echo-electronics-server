const { Schema, model, Types } = require("mongoose");

const productSchema = new Schema(
  {
    owner: {
      type: Types.ObjectId,
      trim: true,
      minLength: 0,
      maxLength: 25,
      required: [true, "Supplier must be required"],
    },
    supplierMail: {
      type: String,
      trim: true,
      minLength: 0,
      maxLength: 1000,
      required: [true, "Supplier mail must be required"],
    },
    image: {
      type: String,
      trim: true,
      minLength: 0,
      maxLength: 1000,
      required: [true, "Image must be required"],
    },
    product: {
      type: String,
      trim: true,
      minLength: 0,
      maxLength: 1000,
      required: [true, "Product must be required"],
    },
    price: {
      type: Number,
      trim: true,
      required: [true, "Price must be required"],
    },
    quantity: {
      type: Number,
      trim: true,
      required: [true, "Quantity must be required"],
    },
    description: {
      type: String,
      trim: true,
      minLength: 0,
      maxLength: 1000,
      required: [true, "Description must be required"],
    },
    sold: {
      type: Number,
      trim: true,
      required: [true, "Sold must be required"],
      min: 0,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, versionKey: false }
);

productSchema.pre("save", function (next) {
  if (this.quantity >= 1) {
    this.inStock = true;
  } else {
    this.inStock = false;
  }

  next();
});

module.exports = model("Product", productSchema);
