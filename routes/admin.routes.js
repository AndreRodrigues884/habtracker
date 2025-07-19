const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controllers');
const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');

router.get('/users', auth, isAdmin, adminController.getUsers);
router.get('/habits', auth, isAdmin, adminController.getHabits);

module.exports = router;