const express = require('express');
const multer = require('multer');
const Dish = require('../models/Dish');
const router = express.Router();
const path = require('path');

// Configure multer storage
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // e.g., 162787878.png
  },
});

const upload = multer({ storage });

// ✅ Add a new dish (POST)
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const image = req.file?.filename;

    if (!name || !price || !image) {
      return res.status(400).json({ error: 'Name, price, and image are required.' });
    }

    const newDish = new Dish({ name, price, description, image });
    await newDish.save();

    res.status(201).json(newDish);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add dish', error: err.message });
  }
});

// ✅ Get all dishes (GET)
router.get('/', async (req, res) => {
  try {
    const dishes = await Dish.find();
    res.json(dishes);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch dishes', error: err.message });
  }
});

// ✅ Update a dish (PUT)
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const updatedData = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
    };
    if (req.file) {
      updatedData.image = req.file.filename;
    }

    const updatedDish = await Dish.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.json(updatedDish);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update dish', error: err.message });
  }
});

// ✅ Delete a dish (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    await Dish.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete dish', error: err.message });
  }
});

module.exports = router;
