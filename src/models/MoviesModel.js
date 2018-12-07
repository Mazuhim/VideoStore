import knex from '../config/db';

export const insert = (data) => {
  return knex
  .from('movies')
  .insert(data);
};

export const list = () => {
  return knex
  .from('movies')
  .orderBy('name');
};

export const get = (data) => {
  return knex
  .from('movies')
  .where('id', data)
  .then(([rows]) => rows);
};

export const update = (data) => {
  const query = knex.from('movies')
  .update(data)
  .update('updatedAt', knex.fn.now())
  .where('id', data.id);
  return query;
};
