const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        trim: true,
    },
    lastName:{
        type: String,
        required: true,
        trim: true,
    },
    username:{
        type: String,
        required: false,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    profileUrl:{
        type: String,
        required: false,
        trim: true,
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'student', 'owner'],
        required: true,
        trim: true,
    },
    phoneNumber:{
        type: String,
        required: false,
        trim: true,
    }
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);