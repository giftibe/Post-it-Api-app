const { Users } = require('../models/user.model');

const { getAllPost } = require('../services/post.service');

class userService {
    async createUser(data) {
        //to create a user
        return await Users.create(data);
    }

    async getAllUsers() {
        //fetch all users
        return await Users.find(
            { isDeleted: false },
            { _id: 1, password: 0 }
        ).sort({ $natural: -1 });
    }

    async getAUser(id) {
        //get a single user by id
        return await Users.findById(id, { _id: 1, password: 0 });
    }

    async getByUserName(data) {
        //get a single user by userName
        return await Users.findOne(data, { _id: 1, password: 0 });
    }

    async getAUserByEmail(filter) {
        //get a single user by id
        return await Users.findOne(filter, { _id: 1, password: 0 });
    }

    async getAllpostByUserName(filter) {
        //finds all the post associated with the filter.
        return await getAllPost(filter);
    }

    async updateAUser(id, data) {
        //update/replace a user by id
        return await Users.findByIdAndUpdate(id, data, { _id: 1, password: 0 });
    }

    async deleteAUser(id) {
        //delete a user by id
        return await Users.findByIdAndUpdate(id, { isDeleted: true });
    }
}

module.exports = new userService();
