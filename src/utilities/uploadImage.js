const cloudinaryConfig = require("../../config/cloudinaryConfig")
const cloudinary = require("cloudinary").v2;
cloudinary.config(cloudinaryConfig);

const uploadImage = async (imageFile) => {
    try {
        const result = await cloudinary.uploader.upload(imageFile.path, {
            folder: 'babybuddy',
            format: 'jpg',
            quality: 'auto',
            fetch_format: 'auto',
        });
        return result.secure_url;
    } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
        throw error;
    }
};

module.exports = uploadImage;