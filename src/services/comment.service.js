const { Comment } = require('../models/comment.model');
class commentService {
    async createComment(data) {
        //to create a comment
        return await Comment.create(data);
    }

    async getAllPostComment(id) {
        //this gets all the comment with a particular id arranged in its newest
        return await Comment.find({ PostId: id }).sort({
            $natural: -1,
        });
    }

    async getAComment(id) {
        //get a single postit by id
        return await Comment.findById(id);
    }

    async updateAComment(id, data) {
        //update/replace a Comment by id
        return await Comment.findByIdAndUpdate(id, data);
    }

    async deleteAComment(id) {
        //delete a Comment by id
        return await Comment.findByIdAndUpdate(id, { isDeleted: true });
    }
}

module.exports = new commentService();
