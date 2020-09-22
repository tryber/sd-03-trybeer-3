const express = require('express');
const { loginController } = require('../controller');

const router = express.Router();

router.get('/', loginController.singinEmail);

module.exports = router;
