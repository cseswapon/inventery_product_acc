require("colors");
require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");
const port = process.env.PORT || 8088;

// database connected

mongoose.connect(process.env.DATABASE).then(() => {
  console.log(`Database Connected Successfully`.black.bgGreen);
});

// server running
app.listen(port,() => {
  console.log(`Server is running port ${port}`.red.bold);
});
