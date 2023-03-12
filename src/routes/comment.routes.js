const express = require('express');
const router = express.Router();
const {
    createAcomment,
    getAPostCommentsWithId,
    getcommentById,
    editAcomment,
    DeleteAcomment,
} = require('../controllers/comment.controller');

router.post('/:PostId/comments', createAcomment);
router.get('/:PostId/comments', getAPostCommentsWithId);
router.delete('/:UserId/comments/:ComId', DeleteAcomment);
router.get('/:PostId/comments/:ComId', getcommentById);
router.put('/:PostId/comments/:ComId', editAcomment);

module.exports = router;
