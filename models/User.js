const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: true,
    },

    avatar: {
        type: String,
        default: null,
    },

    level: {
        type: Number,
        default: 1,
    },

    xp: {
        type: Number,
        default: 0,
    },
     associatedhabits: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Habit'
    }],

    currentStreak: {
        type: Number,
        default: 0,
    },

    longestStreak: {
        type: Number,
        default: 0,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('User', UserSchema);
