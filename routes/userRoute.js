const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.get('/hehe', UserController.getAllUser);
router.post('/register', UserController.addNewUser);


module.exports = router;