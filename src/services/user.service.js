const { Users } = require('../postit.models/user.model');

class userService {
    async createUser(data) {
        //to create a user
        return await Users.create(data);
    }

    async getAllUsers() {
        //fetch all users
        return await Users.find({ isDeleted: false });
    }

    async getAUser(id) {
        //get a single user by id
        return await Users.findById(id);
    }

    async getAUserByEmail(filter) {
        //get a single user by id
        return await Users.findOne(filter);
    }

    async updateAUser(id, data) {
        //update/replace a user by id
        return await Users.findByIdAndUpdate(id, data);
    }

    async deleteAUser(id) {
        //delete a user by id
        return await Users.findByIdAndUpdate(id, { isDeleted: true });
    }
}

module.exports = new userService();
