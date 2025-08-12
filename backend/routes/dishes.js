
const express = require('express');
const multer = require('multer');
const Dish = require('../models/Dish');
const { storage } = require('../config/cloudinary');

const router = express.Router();
const upload = multer({ storage });

// ✅ Debug middleware: Log incoming request headers
router.use((req, res, next) => {
  console.log("📥 [Incoming Request]");
  console.log("➡ Method:", req.method);
  console.log("➡ URL:", req.originalUrl);
  console.log("➡ Content-Type:", req.headers['content-type']);
  next();
});

// ✅ Add Dish Route with detailed debugging
router.post(
  '/add',
  (req, res, next) => {
    console.log("🔍 Pre-Multer Middleware Triggered");
    next();
  },
  upload.single('image'), // ⬅️ Must match frontend FormData field name
  async (req, res) => {
    try {
      console.log("========== 📌 ADD DISH REQUEST ==========");
      console.log("📝 BODY:", JSON.stringify(req.body, null, 2));
      console.log("🖼 FILE:", req.file ? req.file : "❌ No file received");

      const { name, price, description } = req.body;
      const image = req.file?.path; // Cloudinary image URL

      // Validate required fields
      if (!name || !price || !image) {
        console.error("❌ Missing required fields:", { name, price, image });
        return res.status(400).json({ 
          error: 'Name, price, and image are required.',
          received: { name, price, image }
        });
      }

      // Save dish to DB
      const newDish = new Dish({
        name,
        price,
        description: description || '',
        image
      });

      await newDish.save();
      console.log("✅ Dish saved successfully:", newDish);

      res.status(201).json({
        message: "Dish added successfully",
        dish: newDish
      });

    } catch (err) {
      console.error("❌ Error adding dish:", err);
      res.status(500).json({
        message: 'Failed to add dish',
        error: err.message,
        stack: err.stack
      });
    }
  }
);

// ✅ Handle Multer errors explicitly
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    console.error("❌ Multer error:", err);
    return res.status(400).json({ error: err.message });
  } else if (err) {
    console.error("❌ Unknown error:", err);
    return res.status(500).json({ error: err.message });
  }
  next();
});

module.exports = router;
