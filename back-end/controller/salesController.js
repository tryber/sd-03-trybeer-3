const rescue = require('express-rescue');

const { salesService } = require('../service');

const allSales = rescue(async (_req, res) => {
  const sales = await salesService.allSales();

  res.status(200).json(sales);
});

const finishSales = rescue(async (req, res) => {
  const { email, total, address, number, date } = req.body;

  const newSale = await salesService.finishSales(email, total, address, number, date);
console.log(newSale, date)
  res.status(200).json(newSale);
});

module.exports = {
  allSales,
  finishSales,
};
