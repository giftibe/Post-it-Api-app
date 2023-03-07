const {
    createUser,
    getAUser,
    getAllUsers,
    updateAuser,
    deleteAuser,
} = require('../services/user.service');
const { MESSAGES } = require('../messages/messages');

class userController {
    async createUser(req, res) {
        
        // checking if the room type exist
        const checkUser = await getAUser({
            email: req.body.email,
        });

        //if this user exist
        if (checkUser) {
            res.status(409).send({
                success: false,
                message: MESSAGES.DUPLICATE,
            });
        }

        const newUser = await createUser(req.body)
        res.status(201).send({
            message: MESSAGES.CREATED,
            success: true,
            data: newUser
        });
    }
}
