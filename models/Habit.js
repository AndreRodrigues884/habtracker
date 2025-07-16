const mongoose = require('mongoose');
const { FrequencyEnum } = require('../enums/habit.enum');


const HabitSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        default: '',
    },
    frequency: {
        type: String,
        enum: FrequencyEnum,
        required: true,
    },
    startDate: {
        type: Date,
        default: Date.now,
        required: true,
    },
    intention: {
        type: String,
        default: null,
    },
    trigger: {
        type: String,
        default: null,
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

module.exports = mongoose.model('Habit', HabitSchema);
