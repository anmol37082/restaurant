 const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: "dxyxvxldl",
  api_key: "697685844558951",
  api_secret: "94cJaF3JAA3phkzsylTQTZlOOXs"
});


cloudinary.api.ping((error, result) => {
  if (error) {
    console.error("❌ Cloudinary config error:", error);
  } else {
    console.log("✅ Cloudinary connected:", result);
  }
});