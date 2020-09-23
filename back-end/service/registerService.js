const { usersModel } = require('../models');

const singupUser = async (name, email, password, role) => {
  const allUsers = await usersModel.getAllUsers();

  if (allUsers.some((elem) => elem.email === email)) {
    return { error: true, status: 401, message: 'Email already registered!' };
  }
  
  const user = await usersModel.singupUser(name, email, password, role);

  return user;
};

module.exports = {
  singupUser,
};
