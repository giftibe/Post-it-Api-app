const mongoose = require('mongoose');
const generateRandomAvatar = require('../middlewares/avatar.js');
const post = require('./post.model');
const comment = require('./comment.model');
const Schema = mongoose.Schema;

const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
        },

        username: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            maxlength: 10,
            unique: true,
        },

        avatarURL: {
            type: String,
        },

        imgTag: {
            type: String,
        },

        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { immutable: true },
    { timestamps: true }
);

//implemented soft-delete for users
userSchema.pre('remove', function (next) {
    this.isDeleted = false;
    this.save();
    next();
});

const Users = mongoose.model('user', userSchema);
module.exports = { Users };
