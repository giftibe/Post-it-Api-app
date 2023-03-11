const express = require('express');
const router = express.Router();
const {
    createAcomment,
    getAllCommentsWithId,
    getcommentById,
    editAcomment,
    DeleteAcomment,
} = require('../controllers/comment.controller');

router.post('/:PostId/comments', createAcomment);
router.get('/:PostId/comments', getAllCommentsWithId);
router.delete('/:UserId/comments/:ComId', DeleteAcomment);
router.get('/:PostId/comments/:ComId', getcommentById);
router.put('/:PostId/comments/:ComId', editAcomment);

module.exports = router;
