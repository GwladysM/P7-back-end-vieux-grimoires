const multer = require('multer');
const SharpMulter = require('sharp-multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = SharpMulter({
    destination: (req, file, callback) => callback(null, "images"),
    imageOptions: {
        fileFormat: "webp",
        quality: 30,
        resize: { width: 400, height: 500 },
        filename: (req, file, callback) => {
            const timestamp = new Date().toISOString();
            const ref = `${timestamp}-${file.originalname}.webp`
            callback(null, ref);
        }
    }
});
const upload = multer({ storage: storage });

module.exports = upload.single('image');