const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema(
    {
        postit: {
            type: String,
            trim: true,
            minlength: 1,
            maxlength: 50,
            date: { type: Date, default: Date.now },
            // id: mongoose.Types.ObjectId,
        },

        comment: {
            type: Schema.Types.ObjectId,
            ref: 'user',
        },
    },
    { timestamps: true },
    { minimize: false }
);
//implemented soft-delete for post
postSchema.pre('remove', function (next) {
    this.isDeleted = false;
    this.save();
    next();
});

const Post = mongoose.model('post', postSchema);
module.exports = { Post };
