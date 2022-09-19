const Product = require("../modules/Product.module");

exports.serviceGet = async () => {
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
  return await Product.find({}).sort({ name: 1 });
}

exports.servicePost = async (data) => {
    return await Product.create(data);
}