const { Comment } = require('../postit.models/comment.model');
class commentService {
    async createComment(data) {
        //to create a comment 
        return await Comment.create(data);
    }

    async getAllComment() {
        //fetch all Comment
        return await Comment.find({ isDeleted: false }).sort({ $natural: -1 });
    }

    async getAComment(id) {
        //get a single Comment by id
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
