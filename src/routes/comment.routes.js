const express = require('express');
const router = express.Router();
const {
    createAcomment,
    getComments,
    getcommentById,
    editAcomment,
    DeleteAcomment,
} = require('../controllers/comment.controller');

router.post('/post', createAcomment);
router.get('/post', getComments);
router.delete('/post/:id', DeleteAcomment);
router.get('/post/:id', getcommentById);
router.put('/post/:id', editAcomment);

module.exports = router;
