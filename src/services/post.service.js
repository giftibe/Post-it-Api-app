const { Post } = require('../postit.models/post.model');

class postService {
    async createPost(data) {
        //to create a postit
        return await Post.create(data);
    }

    async getAllPost() {
        //fetch all postit
        return await Post.find({ isDeleted: false });
    }

    async getAPost(id) {
        //get a single postit by id
        return await Post.findById(id);
    }

    async updateAPost(id, data) {
        //update/replace a postit by id
        return await Post.findOneAndReplace(id, data);
    }

    async deleteAPost(id) {
        //delete a postit by id
        return await Post.findByIdAndUpdate(id, { isDeleted: true });
    }
}

module.exports = new postService();
