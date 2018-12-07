import { list, get, insert, update } from '../models/MoviesModel';

export const listMovies = () => {
  return list();
};

export const getMovie = (id) => {
  return get(id);
};

export const post = (data) => {
  return insert(data).then(([id]) => id);
};

export const put = (data) => {
  return update(data).then(() => data.id);
};

