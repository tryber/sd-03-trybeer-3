const { usersModel, salesModel } = require('../models');

const allSales = async () => {
  const sales = await salesModel.allSales();

  return sales;
};

const finishSales = async (email, total, address, number, date) => {
  const allUsers = await usersModel.getAllUsers();
  const { id } = allUsers.find((elem) => elem.email === email);

  await salesModel.finishSales(id, total, address, number, date);
  const sales = await salesModel.allSales();
  const UserSales = await sales.filter((elem) => elem.userId === id);
  const positionSale = (UserSales.length - 1);
  const newSale = UserSales[positionSale];
  const saleResponse = {
    saleId: newSale.id,
    erro: false,
    message: 'Compra realizada com sucesso!',
  };

  return saleResponse;
};

module.exports = {
  allSales,
  finishSales,
};
