import knex from '../config/db';

export const insert = (data) => {
  return knex.from('user').insert(data);
};

export const list = () => {
  return knex.from('user').orderBy('name');
};

export const get = (id) => {
  return knex.from('user').where('id', id)
  .then(([rows]) => rows);
};

export const getByName = (user) => {
  return knex.from('user').where('userName', user)
  .then(([rows]) => rows);
};
