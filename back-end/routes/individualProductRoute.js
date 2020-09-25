const express = require('express');
const { individualProductController } = require('../controller');

const router = express.Router();

router.get('/', individualProductController.allSalesProduct);
router.post('/', individualProductController.registerProduct);

module.exports = router;
