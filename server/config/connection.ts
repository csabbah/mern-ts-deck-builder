require("dotenv").config();

const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI, () => {
  console.log("Connected to MongoDB");
});

module.exports = mongoose.connection;
