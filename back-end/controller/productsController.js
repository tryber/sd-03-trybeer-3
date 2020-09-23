const rescue = require('express-rescue');

const { productsService } = require('../service');

const allProducts = rescue(async (_req, res, next) => {
  const products = await productsService.allProducts();

  res.status(200).json(products);
});

module.exports = {
  allProducts,
};
