const multer = require('multer');
const SharpMulter = require('sharp-multer');

const storage = SharpMulter({
    destination: (req, file, callback) => callback(null, "images"),
    imageOptions: {
        fileFormat: "webp",
        quality: 50,
        resize: { width: 400, height: 500 },
        filename: (req, file, callback) => {
            callback(null, file.originalname + Date.now() + '.webp');
        }
    }
});
const upload = multer({ storage: storage });

module.exports = upload.single('image');