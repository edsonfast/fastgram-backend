const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    author: String,
    place: String,
    description: String,
    hashtags: String,
    imagename: String,
    imagesize: Number,
    imagekey: String,
    imageurl: String,
    likes: {
        type: Number,
        default: 0,
    },
    comments: [{
        comment: String,
        created: {
            type: Date,
            default: Date.now
        }
    }]
}, {
    timestamps: true,
});

module.exports = mongoose.model('Post', PostSchema);