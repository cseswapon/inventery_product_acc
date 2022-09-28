const brandService = require("../services/brand.services");

exports.createBrand = async (req, res, next) => {
  try {
    const result = await brandService.createBrandService(req.body);
    res.status(200).send({
      status: "Success",
      message: "Successfully created the brand",
      data: result,
    });
  } catch (error) {
    res
      .status(404)
      .send({ status: "fail", message: "Could't create the brand" });
  }
};
exports.getBrand = async (req, res, next) => {
  try {
    const brand = await brandService.getBrandService();
    res.status(200).send({
      status: "Success",
      message: "Successfully created the brand",
      data: brand,
    });
  } catch (error) {
    res
      .status(404)
      .send({ status: "fail", message: "Could't create the brand" });
  }
};
exports.getBrandById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const brand = await brandService.getBrandIdService(id);
    if (!brand) {
      return res
        .status(404)
        .send({ status: "fail", message: "Could't find brand this id" });
    }
    res.status(200).send({
      status: "Success",
      message: "Successfully created the brand",
      data: brand,
    });
  } catch (error) {
    res
      .status(404)
      .send({ status: "fail", message: "Could't create the brand" });
  }
};
exports.updateBrand = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await brandService.updateBrandIdService(id, req.body);
    if (!result.modifiedCount) {
      return res.status(404).send({
        status: "fail",
        message: "Could't update the brand with this id",
      });
    }
    res.status(200).send({
      status: "Success",
      message: "Successfully update the brand",
    });
  } catch (error) {
    res
      .status(404)
      .send({ status: "fail", message: "Could't create the brand" });
  }
};
