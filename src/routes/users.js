import express from 'express';
import Joi from 'joi';
import { listUsers, getUser, createUser, put } from '../services/UserService';
import Logger from '../helpers/Logger';
import RouteValidator from '../helpers/RouteValidator';

const router = express.Router({ mergeParams: true });

const schema = {
  body: Joi.object().keys({
    id: Joi.number().integer().allow(null),
    name: Joi.string().required(),
    user: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().required(),
  }),
};

router.get('/users', async (req, res) => {
  try {
    const users = await listUsers();
    res.send(users);
  } catch (err) {
    Logger.throw(res, err);
  }
});

router.get('/users/:id', async (req, res) => {
  try {
    const user = await getUser(parseInt(req.params.id));
    res.send(user);
  } catch (err) {
    Logger.throw(res, err);
  }
});

router.post('/users', RouteValidator.validate(schema), async (req, res) => {
  try {
    const id = await createUser(req.body);
    res.status(200).send({ id });
  } catch (err) {
    Logger.throw(res, err, err.message);
  }
});

router.put('/users/:id', RouteValidator.validate(schema), async (req, res) => {
  try {
    req.body.merchantId = req.merchantId;
    req.body.id = req.params.id;
    const id = await put(req.body);
    res.send({ id });
  } catch (err) {
    Logger.throw(res, err);
  }
});

module.exports = router;
