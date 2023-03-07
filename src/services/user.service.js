const { Users } = require('../postit.models/models');

class userService {
    async createUser(data) {
        //to create a user
        return await Users.create(data);
    }

    async getAllUsers() {
        //fetch all users
        return await Users.find();
    }

    async getAUser(filter) {
        //get a single user with id
        return await Users.findById(filter);
    }

    async updateAuser(id, data) {
        //update/replace a user by id
        return await Users.findOneAndReplace(id, data);
    }

    async deleteAuser(id) {
        //delete a user by id
        return await Users.findByIdAndDelete(id);
    }
}

module.exports = new userService();
