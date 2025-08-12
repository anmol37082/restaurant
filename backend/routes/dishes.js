const express = require('express');
const multer = require('multer');
const Dish = require('../models/Dish');
const { storage } = require('../config/cloudinary');
const router = express.Router();

const upload = multer({ storage });

// ✅ Add a new dish
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { name, price, description } = req.body;
    const image = req.file?.path; // Cloudinary URL

    if (!name || !price || !image) {
      return res.status(400).json({ error: 'Name, price, and image are required.' });
    }

    const newDish = new Dish({ name, price, description, image });
    await newDish.save();
    res.status(201).json(newDish);
  } catch (err) {
    console.error("Error adding dish:", err);
    res.status(500).json({ message: 'Failed to add dish', error: err.message });
  }
});

// ✅ Get all dishes
router.get('/', async (req, res) => {
  try {
    const dishes = await Dish.find();
    res.json(dishes);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch dishes', error: err.message });
  }
});

// ✅ Update a dish
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const updatedData = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
    };

    if (req.file) {
      updatedData.image = req.file.path; // ✅ Cloudinary URL
    }

    const updatedDish = await Dish.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.json(updatedDish);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update dish', error: err.message });
  }
});

// ✅ Delete a dish
router.delete('/:id', async (req, res) => {
  try {
    await Dish.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete dish', error: err.message });
  }
});

module.exports = router;
