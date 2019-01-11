import express from 'express';
import Joi from 'joi';
import Logger from '../helpers/Logger';
import RouteValidator from '../helpers/RouteValidator';
import { post, getUserMovie, put, listUserMovieByIdUser } from '../services/UserMovieService';

const router = express.Router({ mergeParams: true });

const schema = {
  body: Joi.object().keys({
    id: Joi.number().integer().allow(null),
    watched: Joi.boolean(),
    idUser: Joi.number().integer(),
    idMovie: Joi.number().integer(),
  }),
};

router.get('/usermovies/user/:id', async (req, res) => {
  const watched = parseInt(req.query.watched);
  console.log('-----------------------------------------');
  console.log(watched);
  console.log('-----------------------------------------');
  try {
    const items = await listUserMovieByIdUser(req.params.id, watched);
    res.send(items);
  } catch (err) {
    Logger.throw(res, err);
  }
});

router.get('/usermovies/:id', async (req, res) => {
  try {
    const items = await getUserMovie(parseInt(req.params.id));
    res.send(items);
  } catch (err) {
    Logger.throw(res, err);
  }
});

router.post('/usermovies', RouteValidator.validate(schema), async (req, res) => {
  try {
    const id = await post(req.body);
    res.status(200).send({ id });
  } catch (err) {
    Logger.throw(res, err);
  }
});

router.put('/usermovies/:id', RouteValidator.validate(schema), async (req, res) => {
  try {
    const id = await put(req.body);
    res.send({ id });
  } catch (err) {
    Logger.throw(res, err);
  }
});

module.exports = router;
