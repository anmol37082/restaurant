const express = require('express');
const multer = require('multer');
const Dish = require('../models/Dish');
const { storage } = require('../config/cloudinary');
const router = express.Router();

const upload = multer({ storage });

// ✅ Add a new dish (with better error logs)
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    console.log("========== ADD DISH REQUEST ==========");
    console.log("BODY:", JSON.stringify(req.body, null, 2));
    console.log("FILE:", req.file ? JSON.stringify(req.file, null, 2) : "No file received");

    const { name, price, description } = req.body;
    const image = req.file?.path; // Cloudinary URL

    if (!name || !price || !image) {
      console.error("❌ Missing required fields:", { name, price, image });
      return res.status(400).json({ error: 'Name, price, and image are required.' });
    }

    const newDish = new Dish({ name, price, description, image });
    await newDish.save();

    console.log("✅ Dish saved successfully:", newDish);
    res.status(201).json(newDish);

  } catch (err) {
    console.error("❌ Error adding dish:", err);
    res.status(500).json({
      message: 'Failed to add dish',
      error: err.message,
      stack: err.stack // 🔍 for debugging on Render
    });
  }
});

module.exports = router;
