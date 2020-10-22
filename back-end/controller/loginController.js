const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');

const { loginService } = require('../service');

const secret = 'xablaublaxablau';

const singinEmail = rescue(async (req, res, next) => {
  const { email, password } = req.body;
  const userValue = await loginService.singinEmail(email, password);
  if (userValue.error) {
    return next(userValue);
  }

  const jwtConfig = {
    expiresIn: '20d',
    algorithm: 'HS256',
  };
  const token = jwt.sign(userValue, secret, jwtConfig);

  const userWithToken = { ...userValue, token };

  res.status(200).json(userWithToken);
});

module.exports = {
  singinEmail,
};
