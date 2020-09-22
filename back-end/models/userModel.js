const connect = require('./connection');

const getAllUsers = async () =>
  connect().then((db) => db
    .getTable('users').select(['id', 'name', 'email', 'password', 'role']).execute())
    .then((results) => results.fetchAll())
    .then((results) => results.map(([id, name, email, password, role]) => (
      {id, name, email, password, role}
  )));

const singinEmail = async (email) =>
  connect().then((db) => db
    .getTable('users').select(['id', 'name', 'email', 'password', 'role'])
    .where('email = :email')
    .bind('email', email)
    .execute())
    .then((results) => results.fetchOne())
    .then(([id, name, email, password, role] = []) => (
      id
        ? {id, name, email, password, role}
        : null
    ));

module.exports = {
  getAllUsers,
  singinEmail,
}