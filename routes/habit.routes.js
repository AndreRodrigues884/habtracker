const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habit.controllers');
const auth = require('../middlewares/auth');

router.get('/', habitController.getHabits);
router.post('/', auth, habitController.createHabit);


module.exports = router;
