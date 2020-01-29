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

export const getByIdMovie = (idMovie, trx) => {
  return knex('stock')
    .transacting(trx)
    .forUpdate()
    .select('*')
    .where('idMovie', idMovie)
    .then(([rows]) => rows);
};

export const returnMovie = (idMovie) => {
  return knex
    .from('stock')
    .increment('available', 1)
    .where('idMovie', idMovie);
};

export const subtractAvailable = (idMovie) => {
  return knex
    .from('stock')
    .where('idMovie', idMovie)
    .decrement('available', 1);
};
