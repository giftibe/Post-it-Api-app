const express = require('express');
const router = express.Router();
const {
    createAcomment,
    getComments,
    getcommentById,
    editAcomment,
    DeleteAcomment,
} = require('../controllers/comment.controller');

router.post('/comments', createAcomment);
router.get('/comments', getComments);
router.delete('/comments/:id', DeleteAcomment);
router.get('/comments/:id', getcommentById);
router.put('/comments/:id', editAcomment);

module.exports = router;
