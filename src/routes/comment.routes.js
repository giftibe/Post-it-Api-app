const express = require('express');
const router = express.Router();
const { validateCommentJoi } = require('../middlewares/joi');
const verify = require('../authorization/auth');
const {
    createAcomment,
    getAPostCommentsWithId,
    getcommentById,
    editAcomment,
    DeleteAcomment,
} = require('../controllers/comment.controller');

router.post('/:PostId/comments', verify, validateCommentJoi, createAcomment);
router.get('/:PostId/comments', getAPostCommentsWithId);
router.delete('/:UserId/comments/:ComId', verify, DeleteAcomment);
router.get('/:PostId/comments/:ComId', getcommentById);
router.put(
    '/:PostId/comments/:ComId',
    verify,
    validateCommentJoi,
    editAcomment
);

module.exports = router;
