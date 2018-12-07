import { list, get, insert, update } from '../models/ActorModel';

export const listActors = () => {
  return list();
};

export const getActor = (id) => {
  return get(id);
};

export const post = (data) => {
  return insert(data).then(([id]) => id);
};

export const put = (data) => {
  return update(data).then(() => data.id);
};
