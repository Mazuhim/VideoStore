import knex from '../config/db';

export const insert = (data) => {
  return knex
    .from('stock')
    .insert(data);
};

export const list = () => {
  return knex
    .from('stock')
    .orderBy('createdAt');
};

export const get = (id) => {
  return knex
    .from('stock')
    .where('id', id)
    .then(([rows]) => rows);
};

export const getAvailable = () => {
  return knex
    .from('stock')
    .whereNotNull('available')
    .where('available', '>', 0);
};

export const getByIdMovie = (idMovie) => {
  return knex
    .from('stock')
    .where('idMovie', idMovie)
    .then(([rows]) => rows);
};

export const returnMovie = (id) => {
  return knex
    .from('stock')
    .update('updatedAt', knex.fn.now())
    .increment('available', 1)
    .where('id', id);
};

export const subtractAvailable = (id) => {
  return knex
    .from('stock')
    .where('id', id)
    .decrement('available', 1)
    .update('updatedAt', knex.fn.now());
};
