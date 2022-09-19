const express = require("express");
const routers = express.Router();
const product = require("../controllers/product.controller");
routers.route('/').get(product.getProduct).post(product.postProduct);

module.exports = routers;
