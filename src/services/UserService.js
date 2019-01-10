// import bcrypt from 'bcrypt';
import Jwt from 'jwt-simple';
import Moment from 'moment';
import { insert, get, getByName, update, list } from '../models/ClientModel';

const secret = 'teste';

export const listUsers = () => {
  return list();
};

export const getUser = (id) => {
  return get(id);
};

export const getUserByName = (name) => {
  return getByName(name);
};

export const post = (data) => {
  const dataEntity = data;
  delete dataEntity.confirmPassword;
  return insert(dataEntity).then(([id]) => id);
};

export const createUser = async (data) => {
  if (data.password === data.confirmPassword) {
    const users = await list();
    if (users.some(user => user.user === data.user)) {
      throw new Error('Já existe um usuario com esse username!, Por favor tente novamente com um username diferente...');
    }
    return post(data);
  }
  throw new Error('Senhas diferentes');
};

export const put = (data) => {
  return update(data).then(() => data.id);
};

export const login = async (user) => {
  const entity = await getByName(user.user);
  if (entity) {
    if (entity.password === user.password) {
      const expires = Moment().add(7, 'days').valueOf();
      const token = Jwt.encode({
        iss: entity.id,
        exp: expires,
      }, secret);
      return { token, expires, entity };
    }
    throw new Error('Senha incorreta');
  } else {
    throw new Error('Usuario não encontrado');
  }
};
