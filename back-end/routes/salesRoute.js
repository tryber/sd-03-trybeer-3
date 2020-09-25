const express = require('express');
const { salesController } = require('../controller');

const router = express.Router();

router.get('/', salesController.allSales);
router.post('/', salesController.finishSales);

module.exports = router;
