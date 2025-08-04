const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  otp: String,
  otpExpiresAt: Date,
  name: { type: String, default: '' },       // 🆕 Full name of the user
  address: { type: String, default: '' }     // 🆕 Address of the user
});

module.exports = mongoose.model('User', userSchema);
