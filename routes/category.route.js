const express = require("express");
const categoryController = require('../controllers/category.controller')
const router = express.Router();

router
  .route("/")
  .get(categoryController.getCategories)
  .post(categoryController.createCategory);

router.route("/:id").get(categoryController.createCategory);

module.exports = router;
