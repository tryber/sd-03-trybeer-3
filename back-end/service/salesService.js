const { usersModel, salesModel } = require('../models');

const finishSales = async (email, total, adress, number, date) => {
  const allUsers = await usersModel.getAllUsers();
  const { id } = allUsers.find((elem) => elem.email === email);

  const newSale = await salesModel.finishSales(id, total, adress, number, date);

  return newSale;
};

module.exports = {
  finishSales,
};
