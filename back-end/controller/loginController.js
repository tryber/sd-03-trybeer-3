const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const { loginService } = require('../service');
// const secret = 'xablaublaxablau';

const singinEmail = rescue(async (req, res) => {
  const { email, password } = req.body;
  const singinEmail = await loginService.singinEmail(email, password);
  res.status(200).json(singinEmail);
});

module.exports = {
  singinEmail,
}