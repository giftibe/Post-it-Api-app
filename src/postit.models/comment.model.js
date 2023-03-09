const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema(
    {
        comments: {
            type: String,
            trim: true,
            _id: ObjectId,
        },
    },
    { timestamps: true }
);

//implemented soft-delete for comment
userSchema.pre('remove', function (next) {
    this.isDeleted = false;
    this.save();
    next();
});

const Comment = mongoose.model('comment', commentSchema);
module.exports = { Comment };
