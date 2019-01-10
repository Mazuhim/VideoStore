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
    .where('id', id).then(([rows]) => rows);
};

export const getCharactByMovieId = (idMovie) => {
  return knex
    .from('character')
    .where('idMovie', idMovie);
};

export const getCharactByActorId = (idActor) => {
  return knex
    .from('character')
    .where('idActor', idActor);
};

export const getIdMovieByActorId = (idActor) => {
  return knex
    .from('character')
    .select('idMovie')
    .where('idActor', idActor);
};

export const update = (data) => {
  return knex
    .from('character')
    .update(data)
    .update('updatedAt', knex.fn.now());
};

