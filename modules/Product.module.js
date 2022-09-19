const mongoose = require('mongoose')
//schema design
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "please enter a product name"],
      unique: true,
      trim: true,
      minLength: [3, "minimum length is 3"],
      maxLength: [100, "maximum length is 100"],
    },
    description: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
      min: [0, "Price can't be negative"],
    },
    unit: {
      type: String,
      require: true,
      enum: {
        values: ["kg", "litter", "pcs"],
        message: "unit value can't be {VALUES}, must be kg/litter/pcs",
      },
    },
    quantity: {
      type: Number,
      require: true,
      min: [0, "Quantity can't be negative"],
      validate: {
        validator: (value) => {
          const isInteger = Number.isInteger(value);
          if (isInteger) {
            return true;
          } else {
            return false;
          }
        },
      },
      message: "Quantity must be integer",
    },
    status: {
      type: String,
      require: true,
      enum: {
        values: ["in-stock", "out-of-stock", "discontinued"],
        message: "status can't be {VALUES}",
      },
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
    },
  },
  {
    timestamps: true,
  }
);

// mongoose middleware for saving data: pre/post

// before saving data

productSchema.pre("save", function (next) {
  if (this.quantity == 0) {
    this.status = "out-of-stock";
  }
  next();
});

// after saving data

/* productSchema.post('save', function (doc, next) {
  console.log('after saving data');
  next()
}) */

// methode inject
productSchema.methods.logger = function () {
  console.log(`Data save for ${this.name}`);
};

// schema ---> module ---> query

const Product = mongoose.model("Product", productSchema);

module.exports = Product;