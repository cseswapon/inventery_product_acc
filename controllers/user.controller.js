const {
  findUserService,
  userHashPassword,
  saveUser,
} = require("../services/user.services");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Email and password are required");
  }

  const existingUser = await findUserService(email);

  if (existingUser) {
    return res.status(409).send("Email already in use");
  }

  const hashedPassword = await userHashPassword(password);

  await saveUser(email, hashedPassword);

  const token = jwt.sign({ email }, "mysecretkey");

  res.status(201).json({ token, message: "Sing In Successfully" });
};
