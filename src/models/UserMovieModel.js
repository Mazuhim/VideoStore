import knex from '../config/db';

export const insert = (data) => {
  return knex.from('usermovie').insert(data);
};

export const list = () => {
  return knex.from('usermovie');
};

export const get = (id) => {
  return knex.from('usermovie').where('id', id)
    .then(([rows]) => rows);
};

export const getByIdMovie = (idMovie) => {
  return knex.from('usermovie').where('idMovie', idMovie)
    .then(([rows]) => rows);
};

export const getByIdUser = (idUser) => {
  return knex.from('usermovie').where('idUser', idUser);
};

export const getWatched = (idUser, watched) => {
  return knex.from('usermovie')
    .where('idUser', idUser)
    .where('watched', watched);
};

export const update = (data) => {
  const query = knex.from('usermovie')
    .update(data)
    .where('id', data.id);
  return query;
};
