const connect = require('../models/connection');

const deleteProductSales = async () => {
  const connection = await connect().then((db) => db.getTable('sales_products'));
  const query = connection.delete().where('sale_id = 1');
  query.execute();
};

const deleteUser = async () => {
  await connect()
    .then((db) => {
      db.getTable('users')
        .delete()
        .where('email = "cpereiramt@gmail.com"')
        .execute();
    });
};

module.exports = { deleteProductSales, deleteUser };
