const { usersModel } = require('../models');

const changeName = async (name, email) => {
  await usersModel.changeName(name, email);

  const user = await usersModel.singinEmail(email);

  return user;
};

module.exports = {
  changeName,
};
