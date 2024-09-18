const express = require('express');
const { createDataLogger ,createPressure} = require('../controller/deviceDataController');

const router = express.Router();

router.post('/dataLogger',createDataLogger);
router.post('/pressure',createPressure);

module.exports = router;