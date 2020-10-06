const { salesModel } = require('../models');

const allSalesProduct = async () => {
  const sales = await salesModel.allSalesProduct();

  return sales;
};

const registerProduct = async (saleId, productId, quantity) => {
  const register = await salesModel.registerProduct(saleId, productId, quantity);

  return register;
};

const arrIds = listSales.data.reduce((acc, elem) => {
  acc = [...acc, elem.id];
  return acc;
}, []);

const getUserSalesProduct = async (id) => {
  const salesProduct = await productsModel.userProducts(id);
  return salesProduct;
};

const middleIntegration = async (arrIds) => {
  const finishArr = await Promise.all(arrIds.reduce((acc, elem) => {
    const arrObj = getUserSalesProduct(elem.id);
    acc = [...acc, ...arrObj];
  }));
  return finishArr;
};

const userProducts = async (arrIds) => {
  const sales = await middleIntegration(arrIds);

  return sales;
};

module.exports = {
  allSalesProduct,
  registerProduct,
  userProducts,
};
