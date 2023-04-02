const {
    createUser,
    getAUser,
    getAllUsers,
    checkUser,
    updateAUser,
    getByUserName,
    deleteAUser,
    getAUserByEmail,
    getAllpostByUserName,
} = require('../services/user.service');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { MESSAGES } = require('../messages/user.message');
const generateRandomAvatar = require('../middlewares/avatar.js');


class userController {
    async createAUser(req, res) {
        try {
            // const email = req.body.email;
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
                let strAvatar = (await avatar).toString();
                let _imageTag = `<img src="${strAvatar}" alt="A representation of the user as an avatar using the email.">`;
                const token = jwt.sign(req.body.email, process.env.SECRET_KEY);

                await createUser({
                    email: req.body.email,
                    username: req.body.username,
                    password: hashedPassword,
                    avatarURL: strAvatar,
                    imgTag: _imageTag,
                    token,
                })

                return res.status(200).send({
                    message: MESSAGES.CREATED,
                    success: true,
                    result: {
                        email: req.body.email,
                        username: req.body.username,
                        avatarURL: strAvatar,
                        imgTag: _imageTag,
                        token,
                    }
                });

            } else {
                return res.status(409).send({
                    message: 'email or username exists already',
                    success: false,
                });
            }
        } catch (err) {
            return {
                message: err.message,
                success: false,
            };
        }
    }


    //login a user
    async login(req, res) {
        const { email, password } = req.body

        const user = await checkUser(email)
        if (!user) {
            return res.status(403).send({
                sucess: false,
                message: MESSAGES.W_EMAIL
            })
        }

        const checkPassword = await bcrypt.compare(password, user.password)
        if (!checkPassword) {
            return res.status(403).send({
                succcess: true,
                message: MESSAGES.PASSWORD
            })

        }
        else if (user && checkPassword) {
            req.session.user = {
                id: user.id,
                email: user.email,
                password: user.password
            }
            return res.status(200).send({
                sucess: true,
                message: MESSAGES.LOGGEDIN
            })
        }
        else {
            return res.status(500).send({
                sucess: true,
                message: MESSAGES.ERROR
            })
        }
    }

    //logout a user
    async logout(req, res) {
        try {
            req.session.destroy()
            return res.status(200).send({
                sucess: true,
                message: MESSAGES.LOGGEDOUT
            })
        } catch {
            return res.status(500).send({
                sucess: true,
                message: MESSAGES.ERROR
            })
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
            let userMail = req.body.email;

            //check if the user to edit exist
            const existing = await getAUser(id);
            if (!existing) {
                return res.status(404).send({
                    message: 'user does not exist',
                    success: false,
                });
            }
            //if user exists, edit/put it
            if (userMail) {
                const avatar = generateRandomAvatar(req.body.email);
                let strAvatar = (await avatar).toString();
                let _imageTag = `<img src="${strAvatar}" alt="A representation of the user as an avatar using the email.">`;
                const change = await updateAUser(id, {
                    email: req.body.email,
                    username: req.body.username,
                    avatarURL: strAvatar,
                    imgTag: _imageTag,
                });

                return res.status(200).send({
                    message: MESSAGES.UPDATED,
                    success: true,
                });
            } else {
                const change = await updateAUser(id, req.body);
                return res.status(200).send({
                    message: MESSAGES.UPDATED,
                    success: true,
                    data: req.body,
                });
            }
        } catch (err) {
            return res.status(401).send({
                message: MESSAGES.ERROR + ': check id',
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
                return res.status(404).send({
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
