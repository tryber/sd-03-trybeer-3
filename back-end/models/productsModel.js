const connect = require('./connection');

const allProducts = async () => connect()
  .then((db) => db
    .getTable('products')
    .select(['id', 'name', 'price', 'url_image'])
    .execute())
  .then((results) => results.fetchAll())
  .then((results) => results.map(([id, name, price, urlImage]) => (
    { id, name, price, image: urlImage }
  )));


const userProducts = async (id) => connect()
.then((db) => db
  .getTable('sales_products')
  .select(['sale_id', 'product_id', 'quantity'])
  .where('sale_id = :sale_id')
  .bind('sale_id', id)
  .execute())
.then((results) => results.fetchAll())
.then((results) => results.map(([saleId, productId, quantity]) => (
  { saleId, productId, quantity })));

module.exports = {
  allProducts,
  userProducts,
};
