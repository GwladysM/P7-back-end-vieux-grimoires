const multer = require('multer');
const fs = require('fs');
const sharp = require('sharp');
const SharpMulter = require('sharp-multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = SharpMulter({
    destination: (req, file, callback) => callback(null, "images"),
    imageOptions: {
        fileFormat: "jpg",
        quality: 50,
        resize: { width: 400, height: 500 },
        fileName: (req, file, callback) => {
            const name = file.originalname.split(' ').joint('_')
            callback(null, name + Date.now() + '.' + extension);
        }
    }
});
const upload = multer({ storage });

module.exports = upload.single('image');