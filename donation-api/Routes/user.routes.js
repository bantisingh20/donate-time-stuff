const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');  // Adjust path as needed
const { verifyuser } = require('../MiddleWare/authhentication');

// Add user route
router.post('/sign-up', UserController.saveUser);
router.post('/login', UserController.Login);
router.post('/verifysession', verifyuser,UserController.TokenVerify);
module.exports = router;