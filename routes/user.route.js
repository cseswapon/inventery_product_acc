const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../modules/User.module");

const router = express.Router();

router.post("/register", async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

  if (!email || !password) {
    return res.status(400).send("Email and password are required");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(409).send("Email already in use");
  }

  const hashedPassword = await User.hashPassword(password);

  const newUser = new User({
    email,
    password: hashedPassword,
  });

  await newUser.save();

  const token = jwt.sign({ email }, "mysecretkey");

  res.status(201).json({ token });
});

module.exports = router;
