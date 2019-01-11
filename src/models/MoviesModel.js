import knex from '../config/db';
import * as Character from './CharacterModel';

export const insert = (data) => {
  return knex
  .from('movie')
  .insert(data);
};

export const list = async (title, initialDate, finalDate, directorId, actorId) => {
  const query = knex
  .from('movie');
  if (title) {
    query.whereRaw('LOWER(title) like ? ', [`%${title.toLowerCase()}%`]);
  }
  if (initialDate) {
    query.where('releaseDate', '>=', initialDate);
  }
  if (finalDate) {
    query.where('releaseDate', '<=', finalDate);
  }
  if (directorId) {
    query.where('directorId', directorId);
  }
  if (actorId) {
    let idsMovies = await Character.getIdMovieByActorId(actorId);
    idsMovies = idsMovies.map(movie => movie.idMovie);
    query.whereIn('id', idsMovies);
  }
  return query.orderBy('title');
};

export const get = (id) => {
  return knex
  .from('movie')
  .where('id', id)
  .then(([rows]) => rows);
};

export const update = (data) => {
  const query = knex.from('movie')
  .update(data)
  .update('updatedAt', knex.fn.now())
  .where('id', data.id);
  return query;
};
