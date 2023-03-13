const express = require('express');
const router = express.Router();
const { validatePostJoi } = require('../middlewares/joi');
const AuthUser = require('../authorization/signInAuth');
const commentRoute = require('./comment.routes');
const {
    createAPostit,
    getAllPostit,
    getPostitById,
    editAPostit,
    DeleteAPost,
} = require('../controllers/post.controller');

router.post('/', AuthUser, validatePostJoi, createAPostit);
router.get('/:id', getPostitById);
router.put('/:id', AuthUser, editAPostit);
router.get('/', getAllPostit);
router.delete('/:id', AuthUser, DeleteAPost);
router.use(commentRoute);

module.exports = router;
