const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    filename: { type: String },
    contentType: { type: String }
});

module.exports = mongoose.model('Image', imageSchema);
