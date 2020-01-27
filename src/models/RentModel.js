import knex from '../config/db';

export const insertRent = (data) => {
  return knex
    .from('rent')
    .insert(data);
};

export const listRents = () => {
  return knex
  .from('rent')
  .orderBy('idUser');
};

export const getRent = (id) => {
  return knex
    .from('rent')
    .where('id', id)
    .then(([rows]) => rows);
};

export const getRentByUser = (idUser) => {
  return knex
    .from('rent')
    .where('idUser', idUser);
};
// export const returnMovie = (data) => {
//   return knex
//     .from('rent')
//     .update(data)
//     .update('closedAt', knex.fn.now())
//     .where('id', data.id);
// };
