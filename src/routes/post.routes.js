const express = require('express');
const router = express.Router();
const commentRoute = require('./comment.routes');
const {
    createAPostit,
    getAllPostit,
    getPostitById,
    editAPostit,
    DeleteAPost,
} = require('../controllers/post.controller');

router.post('/', createAPostit);
router.get('/:id', getPostitById);
router.put('/:id', editAPostit);
router.get('/', getAllPostit);
router.delete('/:id', DeleteAPost);
router.use(commentRoute);

module.exports = router;
