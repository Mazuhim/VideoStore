import knex from '../config/db';

export const insert = (data) => {
  return knex
    .from('rentmovie')
    .insert(data);
};

export const list = () => {
  return knex
    .from('rentmovie')
    .orderBy('createdAt');
};

export const get = (id) => {
  return knex
    .from('rentmovie')
    .where('id', id)
    .then(([rows]) => rows);
};

export const getByIdRent = (idRent) => {
  return knex
    .from('rentmovie')
    .where('idRent', idRent);
};

export const getByIdMovie = (idMovie) => {
  return knex
    .from('rentmovie')
    .where('idMovie', idMovie)
    .then(([rows]) => rows);
};

export const getByInOpen = () => {
  return knex
    .from('rentmovie')
    .whereNull('closedAt');
};

export const returnMovie = (data) => {
  return knex
    .from('rentmovie')
    .update(data)
    .update('closedAt', knex.fn.now())
    .where('id', data.id);
};
