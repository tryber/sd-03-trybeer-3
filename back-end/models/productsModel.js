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

module.exports = {
  allProducts,
};
