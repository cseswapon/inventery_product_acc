const {
  getStoresService,
  createStoreService,
  getStoreByIdService,
} = require("../services/sotre.service");

exports.getStores = async (req, res, next) => {
  try {
    const stores = await getStoresService();

    res.status(200).json({
      status: "success",
      data: stores,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Can't get the stores",
      error: error.message,
    });
  }
};

exports.createStore = async (req, res, next) => {
  try {
    const result = await createStoreService(req.body);

    res.status(200).json({
      status: "success",
      message: "Store created successfully!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't create store",
      error: error.message,
    });
  }
};

exports.getStoreById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const store = await getStoreByIdService(id);

    res.status(200).json({
      status: "success",
      data: store,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Can't get the store",
      error: error.message,
    });
  }
};
