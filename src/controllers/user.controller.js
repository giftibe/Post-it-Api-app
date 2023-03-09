const {
    createUser,
    getAUser,
    getAllUsers,
    updateAuser,
    deleteAuser,
    getAUserByEmail,
} = require('../services/user.service');
const bcrypt = require('bcrypt');

const Users = require('../postit.models/user.model');
const { MESSAGES } = require('../messages/messages');
const generateRandomAvatar = require('../utils/avatar.js');
class userController {
    async createAUser(req, res) {
        try {
            const findAUser = await getAUserByEmail({ email: req.body.email });
            if (!findAUser) {
                // generateRandomAvatar(req.body.email)
                // console.log(req.body.email);
                const saltRounds = 10;
                const salt = await bcrypt.genSalt(saltRounds);
                const hashedPassword = await bcrypt.hash(
                    req.body.password,
                    salt
                );
                const avatar = generateRandomAvatar(req.body.email);
                const user = await createUser({
                    email: req.body.email,
                    password: hashedPassword,
                    role: req.body.role,
                    avatarURL: avatar,
                });
                console.log(user);
                res.status(200).send(user);
            }
            res.status(409).send({
                message: 'exists alreadyy',
                success: false,
            });
        } catch (err) {
            return {
                message: err.message,
                success: false,
            };
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
            res.status(401).send({
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
            const existing = await getAUser(id);
            if (!existing) {
                res.status(404).send({
                    message: 'user does not exit',
                    success: false,
                });
            }

            // if it exists
            // const todelete = await getAUser(
            //     id,
            //     { isDeleted: true },
            //     { new: true }
            // );
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
