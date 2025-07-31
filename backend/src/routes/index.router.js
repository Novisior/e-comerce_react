const express = require("express");
const productModel = require("../models/product.model");

const router = express.Router();

// Middleware to add a custom property to request
router.use((req, res, next) => {
    req.name = "player";
    next();
});

// GET all products
router.get("/", async (req, res) => {
    try {
        const products = await productModel.find();
        res.status(200).json({ 
            message: 'Data found', 
            data: products,
            requestedBy: req.name 
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
