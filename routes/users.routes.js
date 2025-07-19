const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controllers');
const auth = require('../middlewares/auth');


/* router.post('/create-admin', usersController.createAdmin); */
router.post('/register', usersController.register);
router.post('/login', usersController.login);
router.get('/habits', auth, usersController.getUserHabits);


module.exports = router;
