import express from 'express';
import Joi from 'joi';
import Logger from '../helpers/Logger';
import RouteValidator from '../helpers/RouteValidator';
import { listMovies, getMovie, postFullMovie, put } from '../services/MoviesService';

const router = express.Router({ mergeParams: true });

const schema = {
  body: Joi.object().keys({
    id: Joi.number().integer().allow(null),
    title: Joi.string().required(),
    synopsis: Joi.string(),
    releaseDate: Joi.date(),
    directorId: Joi.number(),
    poster: Joi.string(),
    characters: Joi.array().items([
      Joi.object().keys({
        name: Joi.string().required(),
        actor: Joi.object().keys({
          id: Joi.number().integer().allow(null),
          name: Joi.string().required(),
          birthday: Joi.date(),
          nationality: Joi.string(),
        }),
      }),
    ]),
  }),
};

router.get('/movies', async (req, res) => {
  try {
    const initialDate = req.query.initialReleaseDate;
    const title = req.query.title;
    const finalDate = req.query.finalReleaseDate;
    const directorId = parseInt(req.query.directorId);
    const actorId = parseInt(req.query.actorId);

    const items = await listMovies(title, initialDate, finalDate, directorId, actorId);
    res.send(items);
  } catch (err) {
    Logger.throw(res, err);
  }
});

router.get('/movies/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const movie = await getMovie(id);
    res.send(movie);
  } catch (err) {
    Logger.throw(res, err);
  }
});

// router.post('/movies', RouteValidator.validate(schema), async (req, res) => {
//   try {
//     const id = await postMovie(req.body);
//     res.status(200).send({ id });
//   } catch (err) {
//     Logger.throw(res, err);
//   }
// });

router.post('/movies', RouteValidator.validate(schema), async (req, res) => {
  try {
    const id = await postFullMovie(req.body);
    res.status(200).send({ id });
  } catch (err) {
    console.log('ERROOOOO', err);
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
