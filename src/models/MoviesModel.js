import knex from '../config/db';
import * as Character from './CharacterModel';

export const insert = (data) => {
  return knex
  .from('movie')
  .insert(data);
};

export const list = async (initialReleaseDate, finalReleaseDate, directorId, actorId) => {
  console.log('------------------PARAMENTROS DO LIST---------------');
  console.log('data inicial- ', initialReleaseDate, ' datafinal- ', finalReleaseDate, ' director- ', directorId, ' actor- ', actorId);
  const query = knex
  .from('movie');
  if (initialReleaseDate) {
    console.log('if 1');
    query.where('releaseDate', '>=', initialReleaseDate);
  }
  if (finalReleaseDate) {
    console.log('if 2');
    query.where('releaseDate', '<=', finalReleaseDate);
  }
  if (directorId) {
    console.log('if 3');
    query.where('directorId', directorId);
  }
  if (actorId) {
    console.log('if 4');
    let idsMovies = await Character.getIdMovieByActorId(actorId);
    idsMovies = idsMovies.map(movie => movie.idMovie);
    query.whereIn('id', idsMovies);
  }
  return query.orderBy('name');
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
