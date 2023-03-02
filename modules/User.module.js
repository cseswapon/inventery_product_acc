const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const userSchema = {
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  }
};

const User = mongoose.model('User', userSchema);

User.hashPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

User.comparePasswords = async function (password, hash) {
  return bcrypt.compare(password, hash);
};

module.exports = User;