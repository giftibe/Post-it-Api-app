const {
    createComment,
    getAllPostComment,
    getAComment,
    updateAComment,
    deleteAComment,
} = require('../services/comment.service');
const { getAPost } = require('../services/post.service');
const { getAUser } = require('../services/user.service');
const { MESSAGES } = require('../messages/comment.message');
class commentController {
    async createAcomment(req, res) {
        try {
            const { PostId } = req.params;
            const checkId = await getAPost(PostId);
            if (!checkId) {
                return res.status(404).send({
                    message: 'id not found',
                    success: false,
                });
            }
            const { comments } = req.body.comments;
            const { UserId } = req.body;

            const Comment = await createComment({
                comments: req.body.comments,
                PostId,
                UserId,
            });
            return res.status(200).send({
                message: MESSAGES.CREATED,
                success: true,
                result: Comment,
            });
        } catch (err) {
            return {
                message: err.message,
                success: false,
            };
        }
    }

    async getAllCommentsWithId(req, res) {
        try {
            const { PostId } = req.params;

            const checkId = await getAPost(PostId);
            if (!checkId) {
                return res.status(404).send({
                    message: 'id not found',
                    success: false,
                });
            }

            const comment = await getAllPostComment(req.params.id);
            return res.status(201).send({
                message: MESSAGES.FETCHED,
                success: true,
                Comments: comment,
            });
        } catch (err) {
            res.status(500).send({
                message: err.message,
                //  || MESSAGES.ERROR,
                success: false,
            });
        }
    }

    async getcommentById(req, res) {
        try {
            const { PostId } = req.params;
            const { ComId } = req.params;

            //check if valid
            const validPostId = await getAPost(PostId);
            const validComId = await getAComment(ComId);

            if (!validPostId && !validComId) {
                res.status(404).send({
                    message: 'invalid id',
                    success: true,
                });
            }

            const findComment = await getAComment(ComId);
            res.status(201).send({
                message: MESSAGES.FETCHED,
                success: true,
                data: findComment,
            });
        } catch (err) {
            res.status(500).send({
                message: err.message,
                //  || MESSAGES.ERROR,
                success: false,
            });
        }
    }

    async editAcomment(req, res) {
        try {
            const { PostId } = req.params;
            const { ComId } = req.params;
            const updateComment = req.body;

            //check if the comment to edit exist
            const validPostId = await getAPost(PostId);
            const validComId = await getAComment(ComId);

            if (!validPostId && !validComId) {
                res.status(404).send({
                    message: 'invalid id',
                    success: false,
                });
            }

            //if comment exists, edit/put it
            const change = await updateAComment(ComId, updateComment);
            res.status(200).send({
                message: MESSAGES.UPDATED,
                success: true,
                data: change,
            });
        } catch (err) {
            res.status(401).send({
                message: err.message || MESSAGES.ERROR,
                success: false,
            });
        }
    }

    async DeleteAcomment(req, res) {
        const { UserId } = req.params;
        const { ComId } = req.params;

        //check if the id's exist
        const validUserId = await getAUser(UserId);
        const validComId = await getAComment(ComId);

        if (!validUserId && !validComId) {
            res.status(404).send({
                message: 'invalid id',
                success: false,
            });
        }

        //if comment exists, delete it
        const change = await deleteAComment(ComId);
        res.status(200).send({
            message: MESSAGES.DELETED,
            success: true,
        });
    }
    catch(err) {
        res.status(401).send({
            message: err.message || MESSAGES.ERROR,
            success: false,
        });
    }
}

module.exports = new commentController();
