const connect = require('./connection');

const allSales = async () => connect()
  .then((db) => db
    .getTable('sales')
    .select([
      'id',
      'user_id',
      'total_price',
      'delivery_address',
      'delivery_number',
      'sale_date',
      'status',
    ])
    .execute())
  .then((results) => results.fetchAll())
  .then((results) => results.map((
    [id, userId, totalPrice, deliveryAddress, deliveryNumber, saleDate, status],
  ) => (
    {
      id,
      userId,
      total: totalPrice,
      address: deliveryAddress,
      number: deliveryNumber,
      date: saleDate,
      status,
    }
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

const registerProduct = async (saleId, productId, quantity) => connect()
  .then((db) => db
    .getTable('sales_products')
    .insert(['sale_id', 'product_id', 'quantity'])
    .values(saleId, productId, quantity)
    .execute());

const allSalesProduct = async () => connect()
  .then((db) => db
    .getTable('sales_products')
    .select(['sale_id', 'product_id', 'quantity'])
    .execute())
  .then((results) => results.fetchAll())
  .then((results) => results.map(([saleId, productId, quantity]) => (
    { saleId, productId, quantity })));

const changeStatus = async (id, status) => (
  connect()
    .then((db) => db
      .getTable('sales')
      .update()
      .set('status', status)
      .where('id = :id')
      .bind('id', id)
      .execute()));

module.exports = {
  allSales,
  finishSales,
  registerProduct,
  allSalesProduct,
  changeStatus,
};
