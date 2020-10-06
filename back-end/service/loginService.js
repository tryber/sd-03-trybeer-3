const { usersModel } = require('../models');

const singinEmail = async (email, myPassword) => {
  const user = await usersModel.singinEmail(email);
  if (!user) {
    return { error: true, status: 404, message: 'Invalid email!' };
  }
  if (user.password !== myPassword) {
    return { error: true, status: 401, message: 'Incorrect password!' };
  }
  const { password, ...userWithoutPass } = user;
  return userWithoutPass;
};

module.exports = {
  singinEmail,
};
