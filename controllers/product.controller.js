const serviceProduct = require("../services/product.services");

exports.getProduct = async (req, res, next) => {
  try {
    const product = await serviceProduct.serviceGet()
    res.status(200).send({ status: "Success", data: product });
  } catch (err) {
    res.status(404).send({ status: "fail", error: err.message });
  }
};
exports.postProduct = async (req, res, next) => {
  try {
    const body = req.body;
    /*
      const product = new Product(body);
      if (product.quantity == 0) {
        product.status = "out-of-stock";
      } 
      await product.save();
    */
    const result = await serviceProduct.servicePost(body);
    result.logger();
    res
      .status(200)
      .send({ message: "successfully inserted done", data: result });
  } catch (err) {
    res.status(400).send({ message: "something is wrang", error: err.message });
  }
};