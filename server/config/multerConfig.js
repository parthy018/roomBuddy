// config/multerConfig.js
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

// Configure Cloudinary storage for Multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads', // Folder name in your Cloudinary account
        allowed_formats: ['jpg', 'jpeg', 'png'], // Allowed file types
    },
});

// Create Multer instance with the configured storage
const upload = multer({ storage });

module.exports = upload;
