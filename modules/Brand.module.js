const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;
const brandSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      maxLength: 100,
      require: [true, "Please Provide a brand name"],
      unique: true,
      lowercase: true,
    },
    description: String,
    email: {
      type: String,
      validate: [validator.isEmail, "Please Provide Your Valid Email"],
      lowercase: true,
    },
    website: {
      type: String,
      validate: [validator.isURL, "Please Provide a valid url"],
    },
    location: String,
    product: [
      {
        type: ObjectId,
        ref: "Product",
      },
    ],
    supplier: [
      {
        name: String,
        contactNumber: String,
        id: { type: ObjectId, ref: "Supplier" },
      },
    ],
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

const Brand = mongoose.model("Brand", brandSchema);
exports = Brand;
