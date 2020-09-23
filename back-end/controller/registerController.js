const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');

const { registerService } = require('../service');

const secret = 'xablaublaxablau';

const singupUser = rescue(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const newUser = await registerService.singupUser(name, email, password, role);

  if (newUser.error) {
    return next(newUser);
  }

  const jwtConfig = {
    expiresIn: '20m',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: newUser }, secret, jwtConfig);

  const userWithToken = { ...newUser, token };

  res.status(200).json(userWithToken);
});

module.exports = {
  singupUser,
};
