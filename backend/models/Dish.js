const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String, // Cloudinary URL
  description: String,
});

module.exports = mongoose.model('Dish', dishSchema);
