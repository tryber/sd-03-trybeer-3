const express = require('express');
const { registerController } = require('../controller');

const router = express.Router();

router.post('/', registerController.singupUser);

module.exports = router;
