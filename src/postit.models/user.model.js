const mongoose = require('mongoose');
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
            unique: true,
            trim: true,
        },

        postit: {
            type: String,
            trim: true,
            minlength: 1,
            maxlength: 200,
        },

        // comment: {
        //     type: String,
        //     trim: true,
        //     _id:true
        // },

        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
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
