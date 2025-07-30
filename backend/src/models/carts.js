const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: String, // Or mongoose.Schema.Types.ObjectId if you use user references
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

module.exports = mongoose.model("Cart", cartSchema);
