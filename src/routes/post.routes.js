const express = require('express');
const router = express.Router();
const { validatePostJoi } = require('../middlewares/joi');
const verify = require('../authorization/auth');
const commentRoute = require('./comment.routes');
const {
    createAPostit,
    getAllPostit,
    getPostitById,
    editAPostit,
    DeleteAPost,
} = require('../controllers/post.controller');

router.post('/', verify, validatePostJoi, createAPostit);
router.get('/:id', getPostitById);
router.put('/:id', verify, validatePostJoi, editAPostit);
router.get('/', getAllPostit);
router.delete('/:id',verify, DeleteAPost);
router.use(commentRoute);

module.exports = router;
