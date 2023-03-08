const {
    createUser,
    getAUser,
    getAllUsers,
    updateAuser,
    deleteAuser,
} = require('../services/user.service');
const { Users } = require('../postit.models/models');
const { MESSAGES } = require('../messages/messages');

class userController {
    async createAUser(req, res) {
        // checking if the user exist
        try {
            const reqbody = req.body.email;
            let existingUser = await getAllUsers();

            //if this user exist
            if (existingUser == req.body.email) {
                res.status(500).send({
                    success: false,
                    message: 'exist already',
                });
            }

            const newUser = await createUser(req.body);
            res.status(201).send({
                message: MESSAGES.CREATED,
                success: true,
                data: newUser,
            });
        } catch (err) {
            res.status(500).send({ message: MESSAGES.DUPLICATE, success: false });
        }
    }

    //get a single user
    async fetchAUser(req, res) {
        try {
            const { id } = req.params;

            //check if the user to fetch exists
            const existing = await getAUser(id);
            if (!existing) {
                res.status(404).send({
                    message: 'user does not exit',
                    success: false,
                });
            }

            res.status(200).send({
                message: MESSAGES.FETCHED,
                success: true,
                existing,
            });
        } catch (err) {
            res.status(500).send({
                message: err.message || MESSAGES.ERROR,
                success: false,
            });
        }
    }

    //get all users
    async fetchAllUser(req, res) {
        try {
            const data = await getAllUsers();
            res.status(200).send({
                message: MESSAGES.FETCHED,
                success: true,
                data,
            });
        } catch (err) {
            res.status(500).send({
                message: err.message || MESSAGES.ERROR,
                success: false,
            });
        }
    }

    //update a user
    async editAUser(req, res) {
        try {
            const { id } = req.params;
            const updateData = req.body;

            //check if the user to edit exist
            const existingRoom = await getAUser(id);
            if (!existingRoom) {
                res.status(404).send({
                    message: 'user does not exit',
                    success: false,
                });
            }

            //if user exists, edit/put it
            const change = await updateAuser(id, updateData);
            res.status(200).send({
                message: MESSAGES.UPDATED,
                success: true,
                data: change,
            });
        } catch (err) {
            res.status(500).send({
                message: err.message || MESSAGES.ERROR,
                success: false,
            });
        }
    }

    //delete a user
    async DeleteAUser(req, res) {
        try {
            const { id } = req.params;

            //check if user to delete exist
            const existingRoom = await getAUser(id);
            if (!existingRoom) {
                res.status(404).send({
                    message: 'user does not exit',
                    success: false,
                });
            }

            // if it exists
            await deleteAuser(id);
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
module.exports = new userController();
