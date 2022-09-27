const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;
//schema design
const productSchema = mongoose.Schema(
  {
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
    image: [{
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
      message: "please provide valid image url"
    }],
    category: {
      type: String,
      require:true,
    },
    brand: {
      name: {
        type: String,
        require: true,
      },
      id: {
        type: ObjectId,
        ref: "Brand", 
        require:true,
      }
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
