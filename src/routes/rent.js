import express from 'express';
import Joi from 'joi';
import * as RentService from '../services/RentService';
import Logger from '../helpers/Logger';
import RouteValidator from '../helpers/RouteValidator';

const router = express.Router({ mergeParams: true });

const schema = {
  body: Joi.object().keys({
    id: Joi.number().integer().allow(null),
    idUser: Joi.number().required(),
    value: Joi.number().required(),
    rentItens: Joi.array().items([
      Joi.object().keys({
        idMovie: Joi.number().required(),
        returnIn: Joi.date(),
        value: Joi.number().required(),
      }),
    ]),
  }),
};

router.get('/rent', async (req, res) => {
  try {
    const users = await RentService.listRents();
    res.send(users);
  } catch (err) {
    Logger.throw(res, err);
  }
});

router.get('/rent/:id', async (req, res) => {
  try {
    const user = await RentService.getRent(parseInt(req.params.id));
    res.send(user);
  } catch (err) {
    Logger.throw(res, err);
  }
});

router.get('/rent/user/:id', async (req, res) => {
  try {
    const user = await RentService.getRentByUser(parseInt(req.params.id));
    res.send(user);
  } catch (err) {
    Logger.throw(res, err);
  }
});

router.post('/rent', RouteValidator.validate(schema), async (req, res) => {
  try {
    const id = await RentService.post(req.body);
    res.status(200).send({ id });
  } catch (err) {
    Logger.throw(res, err, err.message);
  }
});

router.put('/rent/:id', RouteValidator.validate(schema), async (req, res) => {
  try {
    const id = await RentService.returnMovie(req.params.id);
    res.send({ id });
  } catch (err) {
    Logger.throw(res, err);
  }
});

module.exports = router;
