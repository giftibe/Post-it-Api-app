const {
    createPost,
    getAllPost,
    getAPost,
    updateAPost,
    deleteAPost,
} = require('../services/post.service');
const { MESSAGES } = require('../messages/post.message');

class postController {
    async createAPostit(req, res) {
        try {
            const postits = req.body;
            const post = await createPost(postits);
            res.status(200).send({
                message: MESSAGES.CREATED,
                success: true,
                post,
            });
        } catch (err) {
            return {
                message: err.message,
                success: false,
            };
        }
    }

    async getAllPostit(req, res) {
        try {
            const postit = await getAllPost();
            res.status(201).send({
                message: MESSAGES.FETCHED,
                success: true,
                postit,
            });
        } catch (err) {
            return res.status(500).send({
                message: MESSAGES.ABSENT,
                success: false,
            });
        }
    }

    async getPostitById(req, res) {
        try {
            const { id } = req.params;
            const postit = await getAPost(id);
            res.status(201).send({
                message: MESSAGES.FETCHED,
                success: true,
                postit,
            });
        } catch (err) {
            res.status(500).send({
                message: MESSAGES.ABSENT,
                success: false,
            });
        }
    }

    async editAPostit(req, res) {
        try {
            const { id } = req.params;
            const updatePostit = req.body;

            //check if the postit to edit exist
            const existing = await getAPost(id);
            if (!existing) {
                return res.status(404).send({
                    message: MESSAGES.ABSENT,
                    success: false,
                });
            }

            //if postit exists, edit/put it
            const change = await updateAPost(id, updatePostit);
            res.status(200).send({
                message: MESSAGES.UPDATED,
                success: true,
                data: updatePostit,
            });
        } catch (err) {
            res.status(401).send({
                message: MESSAGES.ERROR,
                success: false,
            });
        }
    }

    async DeleteAPost(req, res) {
        try {
            const { id } = req.params;

            //check if postit to delete exist
            const existing = await getAPost(id);
            if (!existing) {
                return res.status(404).send({
                    message: MESSAGES.ABSENT,
                    success: false,
                });
            }

            await deleteAPost(id);
            res.status(202).send({
                message: MESSAGES.DELETED,
                success: true,
            });
        } catch (err) {
            return res.status(500).send({
                message: err.message || MESSAGES.ERROR,
                success: false,
            });
        }
    }
}

module.exports = new postController();