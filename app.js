const express = require("express");
const app = express();
const cors = require("cors");
const productRoute = require("./routes/product.route");
const brandRoute = require('./routes/brand.route');

// middleware
app.use(cors());
app.use(express.json());
app.use("/api/v1/product", productRoute);
app.use("/api/v1/brand", brandRoute);

// root route
app.get("/", (req, res) => {
  res.status(200).send({ message: "Server Successfully Running" });
});

// by default route
app.get("*", (req, res) => {
  res.status(404).send({ message: "Route Not Found" });
});
module.exports = app;
