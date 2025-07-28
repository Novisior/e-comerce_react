const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // ✅ add JWT
const router = express.Router();
const userModel = require("../models/user.model");

const JWT_SECRET = "your-secret-key"; // ⛔ replace this with process.env.JWT_SECRET in production

// Register Route
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username) return res.status(400).json({ message: "Username is required" });
    if (!email) return res.status(400).json({ message: "Email is required" });
    if (!password) return res.status(400).json({ message: "Password is required" });

    const existingUser = await userModel.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    const hashedPass = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      password: hashedPass
    });

    // ✅ Exclude password from response
    const { password: _, ...safeUser } = user._doc;

    res.status(201).json({ message: "User registered successfully", user: safeUser });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Something went wrong during registration" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email) return res.status(400).json({ message: "Email is required" });
    if (!password) return res.status(400).json({ message: "Password is required" });

    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User does not exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Incorrect email or password" });

    // ✅ Generate JWT Token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

    const { password: _, ...safeUser } = user._doc;

    res.status(200).json({ message: "Login successful", token, user: safeUser });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Something went wrong during login" });
  }
});

module.exports = router;
