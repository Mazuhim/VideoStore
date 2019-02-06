import * as RentModel from '../models/RentModel';
import * as RentItemModel from '../models/RentItemModel';
import * as StockModel from '../models/StockModel';
import knex from '../config/db';

export const listRents = () => {
  return RentModel.listRents();
};

export const getRent = (id) => {
  return RentModel.getRent(id);
};

export const getRentByUser = (idUser) => {
  return RentModel.getRentByUser(idUser);
};

export const post = (data) => {
  const rent = Object.assign({}, data);
  const rentItens = Object.assign(rent.rentItens);
  delete rent.rentItens;

  return knex.transaction((trx) => {
    return RentModel.insertRent(rent).transacting(trx).then(async ([idRent]) => {
      const sql = [];
      if (rentItens) {
        for (const element of rentItens) {
          const item = Object.assign({}, { idRent }, element);
          const stock = await StockModel.getByIdMovie(item.idMovie, trx);
          if (stock && stock.available > 0) {
            sql.push(StockModel.subtractAvailable(element.idMovie).transacting(trx));
            sql.push(RentItemModel.insert(item).transacting(trx));
          } else {
            throw Error('Estamos sem esse filme no estoque:', element, ' por favor remova ele da lista e tente novamente');
          }
        }
        return Promise.all(sql).then(() => {
          return idRent;
        }).catch((err) => {
          console.log(err);
          throw Error(err);
        });
      }
      return idRent;
    });
  });
};

export const returnMovie = async (id) => {
  const rentEntity = await RentModel.getRent(id);
  if (rentEntity) {
    const sql = [];
    return knex.transaction((trx) => {
      return RentItemModel.returnMovie(id).transacting(trx).then(async () => {
        const itens = await RentItemModel.getByIdRent(id);
        itens.forEach((item) => {
          console.log('------------------antes-----------------------');
          sql.push(StockModel.returnMovie(item.idMovie).transacting(trx));
          console.log('------------------depois-----------------------');
        });
        return Promise.all(sql).then(() => {
          return id;
        }).catch((err) => {
          console.log(err);
          throw Error(err);
        });
      });
    });
  }
  throw Error('Registro não encontrado...');
};
