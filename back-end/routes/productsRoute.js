const express = require('express');
const { productsController } = require('../controller');

const router = express.Router();

router.get('/', productsController.allProducts);

module.exports = router;
