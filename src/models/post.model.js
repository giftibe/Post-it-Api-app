const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = require('../models/user.model');

const postSchema = new Schema(
    {
        postit: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            maxlength: 150,
            date: { type: Date, default: Date.now },
        },

        UserId: {
            type: Schema.Types.ObjectId,
            ref: "user",
        },

        isDeleted: {
            type: Boolean,
            default: false,
        },

          title: { type: String },
  description: { type: String },
  filename: { type: String },
  contentType: { type: String }
    },
    { timestamps: true }
);

//implemented soft-delete for post
postSchema.pre('remove', function (next) {
    this.isDeleted = false;
    this.save();
    next();
});

const Post = mongoose.model('post', postSchema);
module.exports = { Post };
