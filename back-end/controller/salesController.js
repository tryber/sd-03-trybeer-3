const rescue = require('express-rescue');

const { salesService } = require('../service');

const finishSales = rescue(async (req, res) => {
  const { email, total, adress, number, date } = req.body;

  const newSale = await salesService.finishSales(email, total, adress, number, date);

  res.status(200).json(newSale);
});

module.exports = {
  finishSales,
};
