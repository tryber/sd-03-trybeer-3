const express = require('express');
const { salesController } = require('../controller');

const router = express.Router();

router.post('/', salesController.finishSales);

module.exports = router;
