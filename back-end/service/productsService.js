const { productsModel } = require('../models');

const allProducts = async () => {
  const products = await productsModel.allProducts();

  return products;
};

module.exports = {
  allProducts,
};
