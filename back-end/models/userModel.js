const connect = require('./connection');

const getAllUsers = async () => connect()
  .then((db) => db
    .getTable('users').select(['id', 'name', 'email', 'password', 'role'])
    .execute())
  .then((results) => results.fetchAll())
  .then((results) => results.map(([id, name, email, password, role]) => (
    { id, name, email, password, role }
  )));

const singinEmail = async (userEmail) => connect()
  .then((db) => db
    .getTable('users').select(['id', 'name', 'email', 'password', 'role'])
    .where('email = :email')
    .bind('email', userEmail)
    .execute())
  .then((results) => results.fetchOne())
  .then(([id, name, email, password, role] = []) => (
    id
      ? { id, name, email, password, role }
      : null
  ));

const singupUser = async (name, email, password, role) => connect()
  .then((db) => db
    .getTable('users')
    .insert(['email', 'password', 'name', 'role'])
    .values(email, password, name, role)
    .execute());

const changeName = async (name, email) => (
  connect()
    .then((db) => db
      .getTable('users')
      .update()
      .set('name', name)
      .where('email = :email')
      .bind('email', email)
      .execute()));

module.exports = {
  getAllUsers,
  singinEmail,
  singupUser,
  changeName,
};
