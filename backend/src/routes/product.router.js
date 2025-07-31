const express = require("express");
const productModel = require("../models/product.model");
const multer = require("multer");
const ImageKit = require("imagekit");
const router = express.Router();

// Setup Multer for file uploads in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ImageKit config — make sure keys are correct and secret keys are never exposed publicly

// CREATE new product with image upload
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const imagekit = new ImageKit({
      publicKey: process.env.PUBLIC_KEY,
      privateKey: process.env.PRIVATE_KEY,
      urlEndpoint: process.env.URLENDPOINT,
    });
    const { title, category, price, description } = req.body;
    const uploadedImage = await imagekit.upload({
      file: req.file.buffer,
      fileName: req.file.originalname,
    });
    
    const product = new productModel({
      title,
      category,
      price,
      description,
      image: uploadedImage.url,
    });
    
    await product.save();
    res.status(201).json({ message: "Product saved", product });
  } catch (err) {
    console.error("Error uploading image or saving product:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// READ all products
router.get("/", async (req, res) => {
  try {
    const products = await productModel.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// READ product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Error fetching product" });
  }
});

// UPDATE product by ID, optional new image upload
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const imagekit = new ImageKit({
      publicKey: process.env.PUBLIC_KEY,
      privateKey: process.env.PRIVATE_KEY,
      urlEndpoint: process.env.URLENDPOINT,
    });
    const { title, category, price, description } = req.body;
    const updatedData = { title, category, price, description };
    
    if (req.file) {
      const uploadedImage = await imagekit.upload({
        file: req.file.buffer,
        fileName: req.file.originalname,
      });
      updatedData.image = uploadedImage.url;
    }
    
    const updated = await productModel.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!updated) return res.status(404).json({ error: "Product not found" });

    res.json({ message: "Product updated", updated });
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ error: "Error updating product" });
  }
});

// DELETE product by ID
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await productModel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting product" });
  }
});

module.exports = router;
