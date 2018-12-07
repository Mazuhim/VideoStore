import { list, get, insert, update } from '../models/CharacterModel';

export const post = (data) => {
  return insert(data).then(([id]) => id);
};

export const listCharacters = () => {
  return list();
};

export const getCharacter = (id) => {
  return get(id);
};

export const put = (data) => {
  return update(data).then(() => data.id);
};
