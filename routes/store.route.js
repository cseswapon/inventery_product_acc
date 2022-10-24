const express = require('express');
const storeController = require('../controllers/store.controller');
const router = express.Router();

router
  .route("/")
  .get(storeController.getStores)
  .post(storeController.createStore);

router.route("/:id").get(storeController.getStoreById);

module.exports = router;