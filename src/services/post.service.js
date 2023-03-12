const { Post } = require('../models/post.model');

class postService {
    async createPost(data) {
        //to create a postit
        return await Post.create(data);
    }

    async getAllPost() {
        //fetch all postit
        return await Post.find({ isDeleted: false }).sort({ $natural: -1 });
    }

    async getAPost(id) {
        //get a single postit by id
        return await Post.find(id);
    }

    async updateAPost(id, data) {
        //update/replace a postit by id
        return await Post.findByIdAndUpdate(id, data);
    }

    async deleteAPost(id) {
        //delete a postit by id
        return await Post.findByIdAndUpdate(id, { isDeleted: true });
    }
}

module.exports = new postService();
