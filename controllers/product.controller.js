const serviceProduct = require("../services/product.services");

exports.getProduct = async (req, res, next) => {
  try { 
    let filters = { ...req.query };
    /* const excludeFiled = ['page', 'limit', 'sort'];
    excludeFiled.forEach(filed => delete filters[filed]);

    console.log("Original data", filters); */

    const queries = {};

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
      // console.log(filters,sortBy);
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
    }

    if (req.query.page) {
      const { page=1, limit=10 } = req.query;
      const skip = (page - 1) * parseInt(limit)
      queries.skip = skip
      queries.limit = limit
    }

    let filterString = JSON.stringify(filters);
    filterString = filterString.replace(
      /\b(gt|lt|gte|lte)\b/g,
      (match) => `$${match}`
    );

    filters = JSON.parse(filterString);
console.log(filters);
    const product = await serviceProduct.serviceGet(filters, queries);

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

exports.postProducts = async (req, res, next) => {
  try {
    const result = await serviceProduct.servicesManyPost(req.body);
    res.status(200).send({ status: true, message: result });
  } catch (err) {
    res.status(404).send({ message: "Failed", error: err.message });
  }
};

exports.patchProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await serviceProduct.servicePatch(id, req.body);
    res.status(200).send({ status: true, message: result });
  } catch (err) {
    res.status(404).send({ message: "Failed", error: err.message });
  }
};

exports.bulkProduct = async (req, res, next) => {
  try {
    const result = await serviceProduct.serviceBulkProduct(req.body);
    res.status(200).send({ status: true, message: result });
  } catch (err) {
    res.status(404).send({ message: "Failed", error: err.message });
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await serviceProduct.serviceDeleteProduct(id);
    if (!result.deletedCount) {
      res
        .status(400)
        .send({ status: false, message: "Could't delete product" });
    } else {
      res.status(200).send({ status: true, message: result });
    }
  } catch (err) {
    res.status(404).send({ message: "Failed", error: err.message });
  }
};

exports.bulkProductDelete = async (req, res, next) => {
  try {
    const { ids } = req.body;
    const result = await serviceProduct.serviceBulkDeleteProduct(ids);
    if (!result.deletedCount) {
      res
        .status(400)
        .send({ status: false, message: "Could't delete product" });
    } else {
      res.status(200).send({ status: true, message: result });
    }
  } catch (err) {
    res.status(404).send({ message: "Failed", error: err.message });
  }
};
