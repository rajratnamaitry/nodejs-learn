const express = require('express');
const toursController = require('../controller/toursController');
const router = express.Router();

router
    .route('/')
    .get(toursController.getAllTour)
    .post(toursController.addTour);

module.exports = router;