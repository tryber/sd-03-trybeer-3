const { usersModel } = require('../models');

const singinEmail = async (email, password) => {
  const user = await usersModel.singinEmail(email)
  return user;
};

module.exports = {
  singinEmail,
}