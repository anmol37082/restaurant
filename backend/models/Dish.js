const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
   description: String,
});

module.exports = mongoose.model('Dish', dishSchema);
