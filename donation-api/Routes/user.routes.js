const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');  // Adjust path as needed

// Add user route
router.post('/users/sign-up', UserController.saveUser);
router.get('/users/login', UserController.Login);
module.exports = router;