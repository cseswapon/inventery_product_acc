const express = require("express");
const routers = express.Router();
const product = require("../controllers/product.controller");

routers.route("/bulk-update").patch(product.bulkProduct);

routers.route("/insert-product").post(product.postProducts);

routers.route("/bulk-delete").delete(product.bulkProductDelete);

routers.route("/").get(product.getProduct).post(product.postProduct);

routers.route("/:id").patch(product.patchProduct).delete(product.deleteProduct);

module.exports = routers;
