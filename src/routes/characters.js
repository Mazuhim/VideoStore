import express from 'express';
import Joi from 'joi';
import Logger from '../helpers/Logger';
import RouteValidator from '../helpers/RouteValidator';
import { post, listCharacters, getCharacter, put } from '../services/CharacterService';

const router = express.Router({ mergeParams: true });

const schema = {
  body: Joi.object().keys({
    id: Joi.number().integer().allow(null),
    name: Joi.string().required(),
    idActor: Joi.number().integer(),
    idMovie: Joi.number().integer(),
  }),
};

router.get('/characters', async (req, res) => {
  try {
    const items = await listCharacters(req.merchantId);
    res.send(items);
  } catch (err) {
    Logger.throw(res, err);
  }
});

router.get('/characters/:id', async (req, res) => {
  try {
    const items = await getCharacter(parseInt(req.params.id));
    res.send(items);
  } catch (err) {
    Logger.throw(res, err);
  }
});

router.post('/characters', RouteValidator.validate(schema), async (req, res) => {
  try {
    const id = await post(req.body);
    res.status(200).send({ id });
  } catch (err) {
    Logger.throw(res, err);
  }
});

router.put('/characters/:id', RouteValidator.validate(schema), async (req, res) => {
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
