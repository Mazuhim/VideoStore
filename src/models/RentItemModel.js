import knex from '../config/db';

export const insert = (data) => {
  return knex
    .from('rentitem')
    .insert(data);
};

export const list = () => {
  return knex
    .from('rentitem')
    .orderBy('createdAt');
};

export const get = (id) => {
  return knex
    .from('rentitem')
    .where('id', id)
    .then(([rows]) => rows);
};

export const getByIdRent = (idRent) => {
  return knex
    .from('rentitem')
    .where('idRent', idRent);
};

export const getByIdMovie = (idMovie) => {
  return knex
    .from('rentitem')
    .where('idMovie', idMovie)
    .then(([rows]) => rows);
};

export const getByInOpen = () => {
  return knex
    .from('rentitem')
    .whereNull('closedAt');
};

export const returnMovie = (id) => {
  return knex
    .from('rentitem')
    .update('closedAt', knex.fn.now())
    .where('idRent', id);
};
