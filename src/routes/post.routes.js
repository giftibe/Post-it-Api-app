const express = require('express');
const router = express.Router();
const {
    createAPostit,
    getAllPostit,
    getPostitById,
    editAPostit,
    DeleteAPost,
} = require('../controllers/post.controller');

router.post('/post', createAPostit);
router.get('/post', getAllPostit);
router.delete('/post/:id', DeleteAPost);
router.get('/post/:id', getPostitById);
router.put('/post/:id', editAPostit);

module.exports = router;
