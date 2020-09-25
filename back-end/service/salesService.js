const { usersModel, salesModel } = require('../models');

const allSales = async () => {
  const sales = await salesModel.allSales();

  return sales;
};

const finishSales = async (email, total, address, number, date) => {
  const allUsers = await usersModel.getAllUsers();
  const { id } = allUsers.find((elem) => elem.email === email);

  const totalToInsert = parseFloat(total).toFixed(2)
    .replace(',', '.');

  const checkout = await salesModel.finishSales(id, totalToInsert, address, number, date);
  const sales = await salesModel.allSales();
  const UserSales = await sales.filter((elem) => elem.userId === id);
  const positionSale = (UserSales.length - 1);
  const newSale = UserSales[positionSale];

  const saleResponse = {
    ...checkout,
    saleId: newSale.id,
  };

  return saleResponse;
};

module.exports = {
  allSales,
  finishSales,
};
