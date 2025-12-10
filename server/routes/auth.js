const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// --------------------- SIGNUP ---------------------
router.post("/signup", async (req, res) => {
  try {
    console.log("SIGNUP BODY:", req.body);

    const { username, password } = req.body;

    // Check empty fields
    if (!username || !password) {
      return res.status(400).json({ msg: "Please fill all fields" });
    }

    // Check if user exists
    const exists = await User.findOne({ username });
    if (exists) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Save new user
    const newUser = new User({
      username,
      password: hashed
    });

    await newUser.save();

    console.log("USER SAVED:", newUser);

    res.json({ msg: "Signup success" });

  } catch (err) {
    console.log("SIGNUP ERROR:", err);
    res.status(500).json({ msg: err.message });
  }
});

// --------------------- LOGIN ---------------------
router.post("/login", async (req, res) => {
  try {
    console.log("LOGIN BODY:", req.body);

    const { username, password } = req.body;

    // Check empty fields
    if (!username || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    // Find user
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        message: "User not found. Please signup first."
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password." });
    }

    // Success
    return res.json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
      },
    });

  } catch (err) {
    console.log("LOGIN ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
