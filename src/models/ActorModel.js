import knex from '../config/db';

export const insert = (data) => {
  return knex
    .from('actor')
    .insert(data);
};

export const list = () => {
  return knex
    .from('actor')
    .orderBy('name');
};

export const get = (id) => {
  return knex
    .from('actor')
    .where('id', id)
    .then(([rows]) => rows);
};

export const update = (data) => {
  return knex
    .from('actor')
    .update(data)
    .where('id', data.id);
};
