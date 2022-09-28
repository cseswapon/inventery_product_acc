const Brand = require("../modules/Brand.module");

exports.createBrandService = async (data) => {
  const result = await Brand.create(data);
  return result;
};
exports.getBrandService = async () => {
  const brand = await Brand.find({}).select("-supplier -product");
  return brand;
};
exports.getBrandIdService = async (id) => {
  const brand = await Brand.find({ _id: id }).select("-supplier -product");
  return brand;
};
exports.updateBrandIdService = async (id,data) => {
    const brand = await Brand.updateOne({ _id: id }, data, {
        runValidators: true
  })
  return brand;
};
