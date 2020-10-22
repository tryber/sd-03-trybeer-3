const express = require('express');
const { profileController } = require('../controller');
const { authJWT } = require('../middlawares');

const router = express.Router();

router.put('/', authJWT, profileController.changeName);

module.exports = router;
