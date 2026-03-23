const express = require('express');
const router = express.Router();
const authController = require('../src/controllers/authController.js');

//Đăng ký 
router.post('/register', authController.register);

module.exports = router;