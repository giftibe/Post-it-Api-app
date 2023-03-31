const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');
const Image = require('../models/image.model');
const reqAuth = require('../authorization/signInAuth');

router.post('/upload', reqAuth, upload.single('images'), async function (req, res, next) {
    try {
        const image = new Image({
            title: req.body.title,
            description: req.body.description,
            filename: req.file.filename,
            contentType: req.file.mimetype
        });
        await image.save();
        res.status(201).json({ message: 'Image uploaded successfully' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;


