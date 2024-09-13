const express = require('express');
const router = express.Router();
const { getData } = require('../controllers/deviceController');

// Define a route for fetching data by device type and date
router.get('/getData', getData);

module.exports = router;