const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../modules/User.module");

const router = express.Router();
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Email and password are required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).send("Invalid email or password");
  }

  const passwordMatch = await User.comparePasswords(password, user.password);

  if (!passwordMatch) {
    return res.status(401).send("Invalid email or password");
  }

  const token = jwt.sign({ email }, "mysecretkey");

  res.status(200).json({
    message: {
      email,
      token,
      message: "Successfully Login",
    },
  });
});

module.exports = router;
