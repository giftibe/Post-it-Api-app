const {
    createComment,
    getAllComment,
    getAComment,
    updateAComment,
    deleteAComment,
} = require('../services/comment.service');
const { MESSAGES } = require('../messages/comment.message');
class commentController {
    async createAcomment(req, res) {
        try {
            const newcomment = req.body;
            const myComment = await createComment(newcomment);
            res.status(200).send({
                message: MESSAGES.CREATED,
                success: true,
                myComment,
            });
        } catch (err) {
            return {
                message: err.message,
                success: false,
            };
        }
    }

    async getComments(req, res) {
        try {
            const comment = await getAllComment();
            res.status(201).send({
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
            const { id } = req.params;
            const getComment = await getAComment(id);
            res.status(201).send({
                message: MESSAGES.FETCHED,
                success: true,
                getComment,
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
            const { id } = req.params;
            const updateComment = req.body;

            //check if the comment to edit exist
            const existing = await getAComment(id);
            if (!existing) {
                return res.status(404).send({
                    message: 'comment does not exit',
                    success: false,
                });
            }

            //if comment exists, edit/put it
            const change = await updateAComment(id, updateComment);
            res.status(200).send({
                message: MESSAGES.UPDATED,
                success: true,
                data: updateComment,
            });
        } catch (err) {
            res.status(401).send({
                message: err.message || MESSAGES.ERROR,
                success: false,
            });
        }
    }

    async DeleteAcomment(req, res) {
        try {
            const { id } = req.params;

            //check if comment to delete exist
            const existing = await getAComment(id);
            if (!existing) {
                res.status(404).send({
                    message: 'comment does not exit',
                    success: false,
                });
            }
            //then delete
            await deleteAComment(id);
            res.status(202).send({
                message: MESSAGES.DELETED,
                success: true,
            });
        } catch (err) {
            res.status(500).send({
                message: err.message || MESSAGES.ERROR,
                success: false,
            });
        }
    }
}

module.exports = new commentController();
