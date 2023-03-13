//
const {
    createPost,
    getAllPost,
    getAPost,
    updateAPost,
    deleteAPost,
} = require('../services/post.service');
const { MESSAGES } = require('../messages/post.message');
const { getAUser } = require('../services/user.service');

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
            const id = req.params.id;
            const updatePostit = req.body;

            //check if the postit to edit exist
            const existing = await getAPost(id);
            if (!existing) {
                return res.status(404).send({
                    message: MESSAGES.ABSENT,
                    success: false,
                });
            }
            const change = await updateAPost(id, updatePostit);
            return res.status(200).send({
                message: MESSAGES.UPDATED,
                success: true,
                data: updatePostit,
            });

            //if postit exists, edit/put it
        } catch (err) {
            res.status(401).send({
                message: MESSAGES.ERROR,
                success: false,
            });
        }
    }

    async DeleteAPost(req, res) {
        try {
            const id = req.params.id;

            //check if postit to delete exist
            const existing = await getAPost(id);
            if (!existing) {
                return res.status(404).send({
                    message: MESSAGES.ABSENT,
                    success: false,
                });
            } else {
                await deleteAPost(id);
                res.status(202).send({
                    message: MESSAGES.DELETED,
                    success: true,
                });
            }
        } catch (err) {
            return res.status(500).send({
                message: err.message || MESSAGES.ERROR,
                success: false,
            });
        }
    }
}

module.exports = new postController();
