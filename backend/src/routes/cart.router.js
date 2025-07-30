const express = require("express");
const router = express.Router();
const Cart = require("../models/carts");
const Product = require("../models/product.model");

// Add to Cart
router.post("/add", async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const existing = await Cart.findOne({ userId, productId });
    if (existing) {
      existing.quantity += 1;
      await existing.save();
      return res.json({ message: "Product quantity updated in cart." });
    }

    const newCartItem = new Cart({ userId, productId });
    await newCartItem.save();
    res.status(201).json({ message: "Product added to cart." });
  } catch (err) {
    res.status(500).json({ error: "Failed to add to cart" });
  }
});

// Get Cart
router.get("/", async (req, res) => {
  const userId = req.query.userId;

  try {
    const cartItems = await Cart.find({ userId }).populate("productId");
    const formatted = cartItems.map((item) => ({
      _id: item._id,
      title: item.productId.title,
      price: item.productId.price,
      image: item.productId.image,
      productId: item.productId._id,
      quantity: item.quantity,
    }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cart" });
  }
});

// Remove from Cart
router.delete("/remove/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Cart.findByIdAndDelete(id);
    res.json({ message: "Item removed from cart" });
  } catch (err) {
    res.status(500).json({ error: "Failed to remove item" });
  }
});

module.exports = router;
