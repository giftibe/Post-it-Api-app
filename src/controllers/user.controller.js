const {
    createUser,
    getAUser,
    getAllUsers,
    updateAUser,
    getByUserName,
    deleteAUser,
    getAUserByEmail,
    getAllpostByUserName,
} = require('../services/user.service');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Users = require('../postit.models/user.model');
const { MESSAGES } = require('../messages/user.message');
const generateRandomAvatar = require('../utils/avatar.js');
class userController {
    async createAUser(req, res) {
        try {
            const findAUser = await getAUserByEmail({ email: req.body.email });
            const findUserName = await getByUserName({
                username: req.body.username,
            });

            if (!findAUser && !findUserName) {
                const saltRounds = 10;
                const salt = await bcrypt.genSalt(saltRounds);
                const hashedPassword = await bcrypt.hash(
                    req.body.password,
                    salt
                );
                const avatar = generateRandomAvatar(req.body.email);

                jwt.sign(
                    { email: req.body.email, password: hashedPassword },
                    process.env.SECRET_KEY,
                    (error, token) => {
                        res.json({
                            message: MESSAGES.REGISTERED,
                            success: true,
                            avatarURL: avatar,
                            username: req.body.username,
                            token,
                        });
                    }
                );
                const user = await createUser({
                    email: req.body.email,
                    password: hashedPassword,
                    username: req.body.username,
                    avatarURL: avatar,
                });
                res.status(200).send(user);
            }
            return res.status(409).send({
                message: 'email or username exists already',
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
            const inputId = req.params.id;
            //check if the id has @ attached to it and remove it
            const firstChar = inputId.charAt(0);
            if (firstChar == '@') {
                const removedAt = inputId.slice(1);
                const strRemovedAt = '' + removedAt;

                //check if the userName exists
                const checkUserName = await getByUserName({ strRemovedAt });
                if (checkUserName) {
                    return res.status(200).send({
                        message: 'found',
                        success: true,
                        checkUserName,
                    });
                } else {
                    return res.status(404).send({
                        message: 'username does not exist',
                        success: false,
                    });
                }
            }

            //check if the userId to fetch exists
            const existing = await getAUser(inputId);
            if (!existing) {
                return res.status(404).send({
                    message: 'user does not exist',
                    success: false,
                });
            }
            return res.status(200).send({
                message: MESSAGES.FETCHED,
                success: true,
                existing,
            });
        } catch (err) {
            return res.status(500).send({
                message: err,
                success: false,
            });
        }
    }

    async fetchAllpostByUserName(req, res) {
        try {
            const inputId = req.params.id;

            //checks if the id has @ attached to it and remove it
            const firstChar = inputId.charAt(0);
            if (firstChar == '@') {
                const removedAt = inputId.slice(1);
                const strRemovedAt = '' + removedAt;

                //check if the userName exists
                const checkUser = await getByUserName({ strRemovedAt });
                const getId = checkUser['_id'];
                // convert to string
                const idString = getId.toString();

                if (checkUser) {

                    // find all the post with the userId
                    const getAllpostByUser = await getAllpostByUserName(
                        idString
                    );
                    return res.status(200).send({
                        message: 'found',
                        success: true,
                        posts: getAllpostByUser,
                    });
                } else {
                    return res.status(404).send({
                        message: 'username does not exist',
                        success: false,
                    });
                }
            }
        } catch (err) {
            return res.status(500).send({
                message: err,
                success: false,
            });
        }
    }

    //get all users
    async fetchAllUser(req, res) {
        try {
            const data = await getAllUsers();
            return res.status(200).send({
                message: MESSAGES.FETCHED,
                success: true,
                data,
            });
        } catch (err) {
            return res.status(500).send({
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
            const existing = await getAUser(id);
            if (!existing) {
                return res.status(404).send({
                    message: 'user does not exist',
                    success: false,
                });
            }

            //if user exists, edit/put it
            const change = await updateAUser(id, updateData);
            return res.status(200).send({
                message: MESSAGES.UPDATED,
                success: true,
                data: updateData,
            });
        } catch (err) {
            return res.status(401).send({
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
                    message: MESSAGES.ABSENT,
                    success: false,
                });
            }

            await deleteAUser(id);
            return res.status(202).send({
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
module.exports = new userController();
