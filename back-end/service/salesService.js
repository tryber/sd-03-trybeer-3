const { usersModel, salesModel } = require('../models');

const allSales = async () => {
  const sales = await salesModel.allSales();

  return sales;
};

const finishSales = async (email, total, address, number, date) => {
  const allUsers = await usersModel.getAllUsers();
  const { id } = allUsers.find((elem) => elem.email === email);

  const newSale = await salesModel.finishSales(id, total, address, number, date);

  return newSale;
};

module.exports = {
  allSales,
  finishSales,
};
