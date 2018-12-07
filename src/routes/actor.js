import express from 'express';
import Joi from 'joi';
import { listActors, getActor, post, put } from '../services/ActorService';
import Logger from '../helpers/Logger';
import RouteValidator from '../helpers/RouteValidator';

const router = express.Router({ mergeParams: true });

const schema = {
  body: Joi.object().keys({
    id: Joi.number().integer().allow(null),
    name: Joi.string().required(),
    birthday: Joi.date(),
    nationality: Joi.string(),
  }),
};

router.get('/actors', async (req, res) => {
  try {
    const items = await listActors(req.merchantId);
    res.send(items);
  } catch (err) {
    Logger.throw(res, err);
  }
});

router.get('/actors/:id', async (req, res) => {
  try {
    const items = await getActor(parseInt(req.params.id));
    res.send(items);
  } catch (err) {
    Logger.throw(res, err);
  }
});

router.post('/actors', RouteValidator.validate(schema), async (req, res) => {
  try {
    const id = await post(req.body);
    res.status(200).send({ id });
  } catch (err) {
    Logger.throw(res, err);
  }
});

router.put('/actors/:id', RouteValidator.validate(schema), async (req, res) => {
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
