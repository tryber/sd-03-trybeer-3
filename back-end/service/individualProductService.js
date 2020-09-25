const { salesModel } = require('../models');

const allSalesProduct = async () => {
  const sales = await salesModel.allSalesProduct();

  return sales;
};

const registerProduct = async (saleId, productId, quantity) => {
  const register = await salesModel.registerProduct(saleId, productId, quantity);

  return register;
};

module.exports = {
  allSalesProduct,
  registerProduct,
};
