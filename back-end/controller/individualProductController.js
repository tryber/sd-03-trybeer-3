const rescue = require('express-rescue');
const { individualProductService } = require('../service');

const allSalesProduct = rescue(async (_req, res) => {
  const salesProducts = await individualProductService.allSalesProduct();

  res.status(200).json(salesProducts);
});

const registerProduct = rescue(async (req, res) => {
  const { saleId, productId, quantity } = req.body;

  await individualProductService.registerProduct(saleId, productId, quantity);

  res.status(200).json();
});

const userProducts = rescue(async (_req, res) => {
  const { arrIds } = req.body;

  const salesProducts = await individualProductService.userProducts(arrIds);

  res.status(200).json(salesProducts);
});

module.exports = {
  allSalesProduct,
  registerProduct,
  userProducts,
};
