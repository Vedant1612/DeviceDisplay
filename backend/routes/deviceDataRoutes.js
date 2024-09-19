const express = require('express');
const { createDataLogger ,createPressure,fetchAllDataLogger,fetchAllPressure} = require('../controller/deviceDataController');

const router = express.Router();

router.post('/dataLogger',createDataLogger);
router.get('/dataLogger',fetchAllDataLogger);
router.post('/pressure',createPressure);
router.get('/pressure', fetchAllPressure); 

module.exports = router;