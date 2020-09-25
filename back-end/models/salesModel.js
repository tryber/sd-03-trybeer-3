const connect = require('./connection');

const allSales = async () => connect()
  .then((db) => db
    .getTable('sales')
    .select(['id', 'user_id', 'total_price', 'delivery_address', 'delivery_number', 'sale_date', 'status'])
    .execute())
  .then((results) => results.fetchAll())
  .then((results) => results.map(([id, userId, totalPrice, deliveryAddress, deliveryNumber, saleDate, status]) => (
    { id, userId, total: totalPrice, address: deliveryAddress, number: deliveryNumber, date: saleDate, status }
  )));

const finishSales = async (id, total, address, number, date, status = 'Pendente') => connect()
  .then((db) => db
    .getTable('sales')
    .insert(['user_id', 'total_price', 'delivery_address', 'delivery_number', 'sale_date', 'status'])
    .values(id, total, address, number, date, status)
    .execute())
  .then(() => (
    {
      erro: false,
      message: 'Compra realizada com sucesso!',
    }
  ));

module.exports = {
  allSales,
  finishSales,
};
