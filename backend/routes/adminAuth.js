const express = require('express');
const router = express.Router();
require('dotenv').config();

// Debug: Log if admin credentials are loaded
console.log('Admin Email from env:', process.env.ADMIN_EMAIL);
console.log('Admin Password from env:', process.env.ADMIN_PASSWORD ? '***' : 'NOT SET');

// Dummy Admin Credentials (for demo)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@restaurant.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  console.log('Login attempt:', { email, passwordProvided: !!password });
  
  if (!email || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'Email and password are required' 
    });
  }
  
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    console.log('Admin login successful for:', email);
    res.json({ 
      success: true, 
      token: 'admin-auth-token',
      message: 'Login successful'
    });
  } else {
    console.log('Admin login failed for:', email);
    res.status(401).json({ 
      success: false, 
      message: 'Invalid credentials',
      debug: process.env.NODE_ENV === 'development' ? 'Check ADMIN_EMAIL and ADMIN_PASSWORD in .env' : undefined
    });
  }
});

module.exports = router;
