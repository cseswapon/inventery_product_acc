const Product = require("../modules/Product.module");

exports.serviceGet = async (filters, queries) => {
  /* const product = await Product.find({
      _id: "632690584128f7776676646e",
      name: "asdf",
    }); */
  /* const product = await Product.find({
      $or: [{ _id: "632690584128f7776676646e"}, {name:'asdf'}],
    }); */
  // const product = await Product.find({status:{$ne:"out-of-stock"}});
  // const product = await Product.find({ quantity: { $gte: 100 } });
  // const product = await Product.find({ name: { $in: ['laptop','watch'] } });
  // const product = await Product.find({},'-name');
  // const product = await Product.find({},'name');
  // const product = await Product.find({}).limit(2)
  // const product = await Product.find({}).sort({quantity:-1})
  // const product = await Product.find({}).select({_id:0,name:1})
  /*
      const product = await Product.where("name").equals("laptop").where("quantity").gte(0); 
    */
  /*
    const product = await Product.where("name")
      .equals("/\w/")
      .where("quantity")
      .gte(100)
      // .limit(2); 
      */
  // const product = await Product.findById("632690584128f7776676646e");
  // return await Product.find({}).sort({ name: 1 });
  const totalProduct = await Product.countDocuments(filters);
  const product = await Product.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy)
  const pageCount = Math.ceil(totalProduct / queries.limit);
  return {totalProduct,pageCount,product}
  };

exports.servicePost = async (data) => {
  return await Product.create(data);
};

exports.servicesManyPost = async (data) => {
  return await Product.insertMany(data);
};

exports.servicePatch = async (id, data) => {
  /* return await Product.updateOne({ _id: id }, { $set: data }, {
        runValidators:true
    } ); 
    */
  return await Product.updateOne(
    { _id: id },
    { $inc: data },
    {
      runValidators: true,
    }
  );

  /* 
    const product = await Product.findById(id);
    const result = await product.set(data).save(); 
    */
  //   return result;
};

exports.serviceBulkProduct = async (data) => {
  /* return await Product.updateMany({ _id: data.ids }, data.data, {
        runValidators:true
    }) */
  const products = [];
  data.ids.forEach((product) => {
    products.push(
      Product.updateOne({ _id: product.id }, product.data, {
        runValidators: true,
      })
    );
  });
  const result = await Promise.all(products);
  return result;
};

exports.serviceDeleteProduct = async (id) => {
  return await Product.deleteOne({ _id: id });
};

exports.serviceBulkDeleteProduct = async (id) => {
  return await Product.deleteMany({ _id: id });
};
