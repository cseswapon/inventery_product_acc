const User = require("../modules/User.module");
exports.findUserService = async (email) => {
  return await User.findOne({ email });
};
exports.userHashPassword = async (password) => {
  return await User.hashPassword(password);
};

exports.saveUser = async (email, hashedPassword) => {
  const newUser = new User({
    email,
    password: hashedPassword,
  });
  return await newUser.save();
};
