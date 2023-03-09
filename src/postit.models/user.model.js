const mongoose = require('mongoose');
const generateRandomAvatar = require('../utils/avatar.js');
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


        avatarURL: {
            type: String,
            immutable:true,

        },

        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
    { minimize: false }
);

//implemented soft-delete for users
userSchema.pre('remove', function (next) {
    this.isDeleted = false;
    this.save();
    next();
});

const Users = mongoose.model('user', userSchema);
module.exports = { Users };
