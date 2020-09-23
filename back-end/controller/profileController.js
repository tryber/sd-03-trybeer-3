const rescue = require('express-rescue');

const { profileService } = require('../service');

const changeName = rescue(async (req, res, next) => {
  const { name, email, token } = req.body;

  const userNewInfo = await profileService.changeName(name, email);

  if (userNewInfo.error) {
    return next(userNewInfo);
  }

  const { id, password: usersecret, ...user } = userNewInfo;
  const userWithToken = { ...user, token };

  res.status(200).json(userWithToken);
});

module.exports = {
  changeName,
};
