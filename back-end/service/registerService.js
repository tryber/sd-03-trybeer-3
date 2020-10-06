const { usersModel } = require('../models');

const singupUser = async (name, email, password, role) => {
  const allUsers = await usersModel.getAllUsers();

  if (allUsers.some((elem) => elem.email === email)) {
    return { error: true, status: 401, message: 'E-mail already in database.' };
  }

  await usersModel.singupUser(name, email, password, role);

  const findUser = await usersModel.singinEmail(email);

  const { password: ussersecret, ...userWithoutPassword } = findUser;

  return userWithoutPassword;
};

module.exports = {
  singupUser,
};
