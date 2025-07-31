const mongoose = require("mongoose");
require("dotenv").config();

const connect = () => {
  return mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("✅ Connected to MongoDB Atlas");
    })
    .catch((err) => {
      console.error("❌ Error connecting to MongoDB:", err.message);
      throw err; // Also rethrow so .catch() in server.js works
    });
};

module.exports = connect;
