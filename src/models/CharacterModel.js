import knex from '../config/db';

export const insert = (data) => {
  return knex
    .from('character')
    .insert(data);
};

export const list = () => {
  return knex
    .from('character');
};

export const get = (id) => {
  return knex
    .from('character')
    .where('id', id);
};

export const update = (data) => {
  return knex
    .from('character')
    .update(data)
    .update('updatedAt', knex.fn.now());
};

