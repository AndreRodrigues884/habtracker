const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controllers');
const auth = require('../middlewares/auth');


router.post('/refresh', usersController.refreshToken);
router.post('/register', usersController.register);
router.post('/login', usersController.login);
router.get('/habits', auth, usersController.getUserHabits);
router.post('/habits/:habitId/complete', auth, usersController.completeHabit);



module.exports = router;
