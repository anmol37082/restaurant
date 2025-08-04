const express = require('express');
const router = express.Router();
const User = require('../models/User');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config();

// ✅ Email Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

// ✅ Send OTP
router.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });

  const otp = crypto.randomInt(100000, 999999).toString();
  const otpExpiresAt = Date.now() + 10 * 60 * 1000;

  let user = await User.findOne({ email });
  if (user) {
    user.otp = otp;
    user.otpExpiresAt = otpExpiresAt;
  } else {
    user = new User({ email, otp, otpExpiresAt });
  }

  await user.save();

  const mailOptions = {
    from: `Apna Restaurant <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your OTP - Apna Restaurant',
    text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
  };

  await transporter.sendMail(mailOptions);

  res.json({ success: true, message: 'OTP sent successfully' });
});

// ✅ Verify OTP
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email, otp });
  if (!user || Date.now() > user.otpExpiresAt) {
    return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
  }

  res.json({
    success: true,
    userId: user._id,
    email: user.email,
    name: user.name || '',
    address: user.address || ''
  });
});

// ✅ Save/Update name & address
router.put('/update-profile', async (req, res) => {
  const { userId, name, address } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    user.name = name;
    user.address = address;

    await user.save();

    res.json({ success: true, message: 'Profile updated successfully' });
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ success: false, message: 'Server error while updating profile' });
  }
});

// ✅ Get user info by ID (for autofill)
router.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    res.json({
      email: user.email,
      name: user.name || '',
      address: user.address || ''
    });
  } catch (err) {
    console.error("Fetch user error:", err);
    res.status(500).json({ success: false, message: 'Server error while fetching user' });
  }
});

module.exports = router;
