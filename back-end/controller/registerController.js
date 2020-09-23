const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');

const { registerService } = require('../service');

const secret = 'xablaublaxablau';

const singupUser = rescue(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const singupUser = await registerService.singupUser(name, email, password, role);

  if (singupUser.error) {
    return next(singupUser);
  }

  const { id, password: usersecret, ...user } = singupUser;

  const jwtConfig = {
    expiresIn: '20m',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: user }, secret, jwtConfig);

  const userWithToken = { ...user, token };
  
  res.status(200).json(userWithToken);
});

module.exports = {
  singupUser,
};
