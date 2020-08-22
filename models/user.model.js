const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    facebookId: {
        type: Number,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    contact: {
        type: String
    },
    website: {
        type: String
    },
    description: {
        type: String
    },
    avatar: {
        type: String,
        default: 'user.png'
    },
    facebook: {
        type: String
    },
    twitter: {
        type: String
    },
    instagram: {
        type: String
    },
    token: {
        type: String
    },
    changedUsername: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;