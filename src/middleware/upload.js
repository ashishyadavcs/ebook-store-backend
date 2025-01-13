import multer from "multer";
import { v2 as cloudinary } from "cloudinary"; // Use v2 for the Cloudinary API
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    folder: "uploads", // Folder name on Cloudinary
    allowedFormats: ["jpg", "jpeg", "png", "webp", "pdf"],
});
const upload = multer({ storage: storage });

export default upload;
