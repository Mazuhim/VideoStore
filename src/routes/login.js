import express from 'express';
import Joi from 'joi';
import { login } from '../services/UserService';
import Logger from '../helpers/Logger';
import RouteValidator from '../helpers/RouteValidator';

const router = express.Router({ mergeParams: true });
const schema = {
  body: Joi.object().keys({
    user: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

router.post('/login', RouteValidator.validate(schema), async (req, res) => {
  try {
    const user = await login(req.body);
    delete user.entity.password;
    res.status(200).send({ user });
  } catch (err) {
    Logger.throw(res, err, err.message);
  }
});

module.exports = router;
