const express = require('express');
const userController = require('../controller/authController');
const router = express.Router();

router
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.signup);

router
    .route('/login')
    .post(userController.login);

module.exports = router;