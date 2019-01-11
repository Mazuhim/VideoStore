import * as MoviesModel from '../models/MoviesModel';
import * as ActorModel from '../models/ActorModel';
import * as CharacterModel from '../models/CharacterModel';
import knex from '../config/db';

export const listMovies = (title, initialDate, finalDate, directorId, actorId) => {
  return MoviesModel.list(title, initialDate, finalDate, directorId, actorId);
};

export const getMovie = async (id) => {
  const movie = await MoviesModel.get(id);
  let characters = await CharacterModel.getCharactByMovieId(movie.id);

  characters = characters.map(async (character) => {
    const actor = await ActorModel.get(character.idActor);
    const characterActor = Object.assign({}, character, { actor });
    return characterActor;
  });
  characters = await Promise.all(characters);

  const fullMovie = Object.assign({}, movie, { characters });
  return fullMovie;
};

export const postMovie = (data) => {
  return MoviesModel.insert(data).then(([id]) => id);
};

export const put = (data) => {
  return MoviesModel.update(data).then(() => data.id);
};

export const postFullMovie = async (data) => {
  const characters = data.characters;
  const movie = data;

  delete movie.characters;

  // const idMovie = await MoviesModel.insert(movie).transacting(trx).then(([id]) => id);

  // characters.forEach(async (element) => {
  //   const idActor = await ActorModel.insert(element.actor);
  //   const character = { name: element.name, idMovie, idActor };
  //   const idCharacter = await CharacterModel.insert(character);
  //   console.log('IDS: ', idMovie, ', ', idActor, ', ', idCharacter);
  // });
  // return idMovie;

  return knex.transaction((trx) => {
    return MoviesModel.insert(movie).transacting(trx).then(([idMovie]) => {
      const sql = [];
      if (characters) {
        characters.forEach((element) => {
          sql.push(ActorModel.insert(element.actor).transacting(trx).then(([idActor]) => {
            const character = { name: element.name, idMovie, idActor };
            console.log('character: ', character);
            return CharacterModel.insert(character).transacting(trx);
            // return idActor;
          }));
        });
        return Promise.all(sql).then(() => idMovie)
          .catch((err) => {
            console.log('deu erro');
            throw Error(err);
          });
      }
      console.log('vai retornar: ', idMovie);
      return idMovie;
    });
  });
};
