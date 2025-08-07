const cloudinary = require('cloudinary').v2;
require('dotenv').config(); // जरूरी: .env फ़ाइल को लोड करने के लिए

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = cloudinary;
