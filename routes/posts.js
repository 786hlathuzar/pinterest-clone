const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/pinterestClone")
const postSchema = new mongoose.Schema({
    postText: {
        type: String,
        required: true,
        trim: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically sets the current date
    },
    time: {
        type: String,
        default: () => new Date().toLocaleTimeString(), // Automatically sets the current time as a string
    },
    likes: {
        type: Array,
        default: [],
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Post', postSchema);


