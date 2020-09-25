const { salesModel } = require('../models');

const allSalesProduct = async () => {
  const sales = await salesModel.allSalesProduct();
console.log(sales)
  return sales;
};

const registerProduct = async (saleId, productId, quantity) => {
  const register = await salesModel.registerProduct(saleId, productId, quantity);
console.log('service', register)
  return register;
};

module.exports = {
  allSalesProduct,
  registerProduct,
};
