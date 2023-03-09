const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema(
    {
        postit: {
            type: String,
            trim: true,
            minlength: 1,
            maxlength: 200,
        },

        comment: {
            type: Schema.Types.ObjectId,
            ref: 'user',
        },
    },
    { timestamps: true }
);
//implemented soft-delete for post
userSchema.pre('remove', function (next) {
    this.isDeleted = false;
    this.save();
    next();
});

const Post = mongoose.model('post', postSchema);
module.exports = { Post };
