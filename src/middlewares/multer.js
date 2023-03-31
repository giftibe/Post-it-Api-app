const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});

// Filter files to only allow images
const fileFilter = function (req, file, cb) {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Only images are allowed'));
    }
};

// Initialize multer
const upload = multer({ storage: storage, fileFilter: fileFilter });


module.exports = upload;
