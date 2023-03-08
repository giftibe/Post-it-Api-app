const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ObjectId = mongoose.Schema.Types.ObjectId;

const commentSchema = new Schema({
    comments: {
        type: String,
        trim: true,
    },
});

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },

    // icon: {
    //     type: String,
    //     unique: true,
    //     trim: true,
    // },

    // postit: {
    //     type: String,
    //     trim: true,
    //     _id:true,
    //     createdOn: {
    //         type: Date,
    //         default: Date.now,
    //     },
    // },

    // comment: {
    //     type: String,
    //     trim: true,
    //     _id:true
    // },
});

const postSchema = new Schema({
    postit: {
        type: String,
        trim: true,
    },

    comment: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
});

const Comment = mongoose.model('comment', commentSchema);
const Post = mongoose.model('post', postSchema);
const Users = mongoose.model('user', userSchema);
module.exports = { Users };

