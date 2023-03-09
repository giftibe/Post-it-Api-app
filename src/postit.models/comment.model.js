const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema(
    {
        comments: {
            type: String,
            trim: true,
        },
    },
    { timestamps: true },
    { minimize: false }
);

//implemented soft-delete for comment
commentSchema.pre('remove', function (next) {
    this.isDeleted = false;
    this.save();
    next();
});

const Comment = mongoose.model('comment', commentSchema);
module.exports = { Comment };
