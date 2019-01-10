import knex from '../config/db';

export const insert = (data) => {
  return knex.from('client').insert(data);
};

export const list = () => {
  return knex.from('client').orderBy('name');
};

export const get = (id) => {
  return knex.from('client').where('id', id)
  .then(([rows]) => rows);
};

export const getByName = (user) => {
  return knex.from('client').where('user', user)
  .then(([rows]) => rows);
};
