const express = require('express');
const router = express.Router();
const Dish = require('../models/Dish');
const multer = require('multer');
const cloudinary = require('../utils/cloudinary');
const fs = require('fs');

const upload = multer({ dest: 'uploads/' });

router.post('/api/dishes', upload.single('image'), async (req, res) => {
  try {
    const { name, price, description } = req.body;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Save to MongoDB
    const dish = new Dish({
      name,
      price,
      description,
      image: result.secure_url
    });

    await dish.save();

    // Delete local temp file
    fs.unlinkSync(req.file.path);

    res.status(201).json(dish);
  } catch (error) {
    console.error('Error adding dish:', error);
    res.status(500).json({ message: 'Server error while uploading dish' });
  }
});
