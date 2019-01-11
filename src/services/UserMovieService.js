import * as UserMovieModel from '../models/UserMovieModel';
import { get } from '../models/MoviesModel';

export const post = (data) => {
  return UserMovieModel.insert(data).then(([id]) => id);
};

export const listUserMovie = () => {
  return UserMovieModel.list();
};

export const getUserMovie = (id) => {
  return UserMovieModel.get(id);
};

export const put = (data) => {
  return UserMovieModel.update(data).then(() => data.id);
};

export const listUserMovieByIdUser = async (id, watched) => {
  let userMovies;
  if (isNaN(watched)) {
    console.log('entrou no if');
    userMovies = await UserMovieModel.getByIdUser(id);
  } else {
    userMovies = await UserMovieModel.getWatched(id, watched);
  }

  userMovies = userMovies.map(async (relationship) => {
    const movie = await get(relationship.idMovie);
    let userMovie = Object.assign({}, relationship);
    delete userMovie.idMovie;
    userMovie = Object.assign(userMovie, { movie });
    return userMovie;
  });
  userMovies = await Promise.all(userMovies);
  return userMovies;
};
