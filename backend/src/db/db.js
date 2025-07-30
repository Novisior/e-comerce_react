const mongoose = require("mongoose");
require("dotenv").config(); // ✅ Load .env variables

const connect = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("✅ Connected to MongoDB Atlas");
    })
    .catch((err) => {
      console.error("❌ Error connecting to MongoDB:", err.message);
    });
};

module.exports = connect;
