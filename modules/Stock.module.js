const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;
//schema design
const stockSchema = mongoose.Schema(
  {
    id: {
      type: ObjectId,
      require: true,
      ref: "Product",
    },
    name: {
      type: String,
      require: [true, "please enter a product name"],
      unique: true,
      trim: true,
      lowercase: true,
      minLength: [3, "minimum length is 3"],
      maxLength: [100, "maximum length is 100"],
    },
    description: {
      type: String,
      require: true,
    },
    unit: {
      type: String,
      require: true,
      enum: {
        values: ["kg", "litter", "pcs", "bag"],
        message: "unit value can't be {VALUE}, must be kg/litter/pcs",
      },
    },
    image: [
      {
        type: String,
        validate: {
          validator: (value) => {
            if (!Array.isArray(value)) {
              return false;
            }
            let isValid = true;
            value.forEach((url) => {
              if (!validator.isURL(url)) {
                isValid = false;
              }
            });
            return isValid;
          },
        },
        message: "please provide valid image url",
      },
    ],
    price: {
      type: Number,
      require: true,
      min: [0, "Product price can't be negative"],
    },
    quantity: {
      type: Number,
      require: true,
      min: [0, "Product quantity can't be negative"],
    },
    category: {
      type: String,
      require: true,
    },
    brand: {
      name: {
        type: String,
        require: true,
      },
      id: {
        type: ObjectId,
        ref: "Brand",
        require: true,
      },
    },
    status: {
      type: String,
      require: true,
      enum: {
        values: ["in-stock", "out-of-stock", "discontinue"],
        message: "status can't be {VALUE}",
      },
    },
    store: {
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
      id: {
        type: ObjectId,
        require: true,
        ref: "Store",
      },
      suppliedBy: {
        name: {
          type: String,
          require: [true, "please enter a product name"],
          trim: true,
        },
        id: {
          type: ObjectId,
          ref: "Supplier",
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

// mongoose middleware for saving data: pre/post

// before saving data

stockSchema.pre("save", function (next) {
  if (this.quantity == 0) {
    this.status = "out-of-stock";
  }
  next();
});

// methode inject
stockSchema.methods.logger = function () {
  console.log(`Data save for ${this.name}`);
};

// schema ---> module ---> query

const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
