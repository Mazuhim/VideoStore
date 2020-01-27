import * as MoviesModel from '../models/MoviesModel';
import * as ActorModel from '../models/ActorModel';
import * as CharacterModel from '../models/CharacterModel';
import * as StockModel from '../models/StockModel';
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
  const characters = Object.assign({}, data.characters);
  const movie = data;
  let stock = { amount: data.amount, available: data.amount };

  delete movie.characters;
  delete movie.amount;

  return knex.transaction((trx) => {
    return MoviesModel.insert(movie).transacting(trx).then(async ([idMovie]) => {
      const sql = [];
      if (characters) {
        characters.forEach((element) => {
          sql.push(ActorModel.insert(element.actor).transacting(trx).then(([idActor]) => {
            const character = { name: element.name, idMovie, idActor };
            return CharacterModel.insert(character).transacting(trx);
          }));
        });
        stock = Object.assign({ idMovie }, stock);
        await StockModel.insert(stock).transacting(trx);
        return Promise.all(sql).then(() => idMovie)
          .catch((err) => {
            throw Error(err);
          });
      }
      return idMovie;
    });
  });
};
