const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;
const storeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      require: [true, "Please Provide a brand name"],
      lowercase: true,
      enum: {
        values: ["dhaka", "tangail", "rangpur"],
        message: "{VALUE} is not a valid name`",
      },
    },
    description: String,
    manager: {
      name: String,
      contactNumber: String,
      id: {
        type: ObjectId,
        ref: "User",
      },
    },
  },
  { timestamps: true }
);

const Store = mongoose.model("Store", brandSchema);
exports = Store;
