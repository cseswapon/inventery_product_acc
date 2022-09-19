const express = require("express");
const app = express();
const cors = require("cors");
const productRoute = require("./routes/product.route");

// middleware
app.use(cors());
app.use(express.json());
app.use("/api/v1/product", productRoute);

// root route
app.get("/", (req, res) => {
  res.status(200).send({ message: "Server Successfully Running" });
});

// by default route
app.get("*", (req, res) => {
  res.status(404).send({ message: "Route Not Found" });
});
module.exports = app;
