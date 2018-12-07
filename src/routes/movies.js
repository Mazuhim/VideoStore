import express from 'express';
import Joi from 'joi';
import Logger from '../helpers/Logger';
import RouteValidator from '../helpers/RouteValidator';
import { listMovies, getMovie, post, put } from '../services/MoviesService';

const router = express.Router({ mergeParams: true });

const schema = {
  body: Joi.object().keys({
    id: Joi.number().integer().allow(null),
    name: Joi.string().required(),
    synopsis: Joi.string(),
    releaseDate: Joi.date(),
  }),
};

router.get('/movies', async (req, res) => {
  try {
    const items = await listMovies(req.merchantId);
    res.send(items);
  } catch (err) {
    Logger.throw(res, err);
  }
});

router.get('/movies/:id', async (req, res) => {
  try {
    const items = await getMovie(parseInt(req.params.id));
    res.send(items);
  } catch (err) {
    Logger.throw(res, err);
  }
});

router.post('/movies', RouteValidator.validate(schema), async (req, res) => {
  try {
    const id = await post(req.body);
    res.status(200).send({ id });
  } catch (err) {
    Logger.throw(res, err);
  }
});

router.put('/movies/:id', RouteValidator.validate(schema), async (req, res) => {
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
