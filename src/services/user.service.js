const { Users } = require('../postit.models/user.model');

class userService {
    async createUser(data) {
        //to create a user
        return await Users.create(data);
    }

    async getAllUsers() {
        //fetch all users
        return await Users.find();
    }

    async getAUser(id) {
        //get a single user by id
        return await Users.findById(id);
    }

    async updateAuser(id, data) {
        //update/replace a user by id
        return await Users.findOneAndReplace(id, data);
    }

    async deleteAuser(id) {
        //delete a user by id
        return await Users.findByIdAndUpdate(id, { isDeleted: true });
    }
}

module.exports = new userService();
