const { usersModel, salesModel } = require('../models');

const allSales = async () => {
  const sales = await salesModel.allSales();

  return sales;
};

const finishSales = async (email, total, address, number, date) => {
  const allUsers = await usersModel.getAllUsers();
  const { id } = allUsers.find((elem) => elem.email === email);

  const totalToInsert = total.replace(',', '.');

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

const changeStatus = async (id) => {
  await salesModel.changeStatus(id, 'Entregue');

  return 'ok';
};

module.exports = {
  allSales,
  finishSales,
  changeStatus,
};
