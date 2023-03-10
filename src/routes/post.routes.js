const express = require('express');
const router = express.Router();
const {
    createAPostit,
    getAllPostit,
    getPostitById,
    editAPostit,
    DeleteAPost,
} = require('../controllers/post.controller');

router.post('/posts', createAPostit);
router.get('/posts', getAllPostit);
router.delete('/posts/:id', DeleteAPost);
router.get('/posts/:id', getPostitById);
router.put('/posts/:id', editAPostit);

module.exports = router;
