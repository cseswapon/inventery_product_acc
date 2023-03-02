const express = require("express");
const app = express();
const cors = require("cors");
const productRoute = require("./routes/product.route");
const brandRoute = require("./routes/brand.route");
const storeRoute = require("./routes/store.route");
const categoryRoute = require("./routes/category.route");
const userRoute = require("./routes/user.route");
const loinUser = require("./routes/login.route");
// middleware
app.use(cors());
app.use(express.json());
app.use("/api/v1/product", productRoute);
app.use("/api/v1/brand", brandRoute);
app.use("/api/v1/store", storeRoute);
// app.use("/api/v1/brand", categoryRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/user", loinUser);

// root route
app.get("/", (req, res) => {
  res.status(200).send({ message: "Server Successfully Running" });
});

// by default route
app.get("*", (req, res) => {
  res.status(404).send({ message: "Route Not Found" });
});
module.exports = app;
