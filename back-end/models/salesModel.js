const connect = require('./connection');

const finishSales = async (id, total, adress, number, date) => connect()
  .then((db) => db
    .getTable('sales')
    .insert(['user_id', 'total_price', 'delivery_address', 'delivery_number', 'sale_date'])
    .values(id, total, adress, number, date)
    .execute())
  .then(() => (
    {
      erro: false,
      message: 'Compra realizada com sucesso!',
    }
  ));

module.exports = {
  finishSales,
};
