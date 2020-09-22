const { usersModel } = require('../models');

const singinEmail = async (email, password) => {
  const user = await usersModel.singinEmail(email);
  if(!user) {
    return {error: true, status: 404, message: 'Invalid email!'}
  }
  if(user.password !== password) {
    return {error: true, status: 401, message: 'Incorrect password!'}
  }
  return user;
};

module.exports = {
  singinEmail,
}