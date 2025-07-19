const User = require('../models/User');
const Habit = require('../models/Habit');
require('dotenv').config();

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    return res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    return res.error('GET_USERS_FAILED');
  }
};

const getHabits = async (req, res) => {
  try {
    const habits = await Habit.find().sort({ createdAt: -1 });
    return res.status(200).json({ habits });
  } catch (error) {
    console.error(error);
    return res.error('GET_HABITS_FAILED');
  }
};


module.exports = {
  getUsers,
  getHabits
};