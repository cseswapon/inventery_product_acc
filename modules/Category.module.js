const mongoose = require("mongoose");
const validator = require("validator");

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      require: [true, "Please Provide Your category name"],
      lowercase: true,
      unique: true,
    },
    deception: String,
    imgUrl: {
      type: String,
      require: true,
      validate: [validator.isUrl, "Please Provider your valid url"],
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;