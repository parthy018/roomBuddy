// config/multerConfig.js
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from "./cloudinary.js";

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

export default upload;
