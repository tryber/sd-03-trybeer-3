const jwt = require('jsonwebtoken');
const model = require('../models/userModel');

const secret = 'xablaublaxablau';

const authJWT = async (req, res, next) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }

  try {
    const decoded = jwt.verify(token, secret);

    const { email } = decoded.data;

    const user = await model.singinEmail(email);

    if (!user) {
      return res.status(401).json({ message: 'missing auth token' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = {
  authJWT,
};
