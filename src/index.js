import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import moviesRoutes from './routes/movies';
import actorRoutes from './routes/actor';
import characterRoutes from './routes/characters';
import userRoutes from './routes/users';
import loginRoutes from './routes/login';
import userMoviesRoutes from './routes/usermovies';
import rentRoutes from './routes/rent';
import Logger from './helpers/Logger';
import jwt from './config/jwt';

const knex = require("knex");

const knexFile = require("../knexfile");


require('dotenv').config();

const database = knex(knexFile);

if (process.env.NODE_ENV === "development") {
  database.on("query", (query) => {
    let { sql } = query;
    if (query.bindings) {
      query.bindings.forEach((binding) => {
        sql = sql.replace("?", binding);
      });
    }
    console.log(sql);
  });
}

const app = express();
app.use(helmet());
app.use(bodyParser.json({
  // limit: process.env.BODY_LIMIT,
}));

// LoggerConfig.expressRequest(app);

app.get('/api-movies/status', (req, res) => {
  res.send('ok');
});

app.use('/api-movies/v1/', loginRoutes);
app.use(jwt);
app.use('/api-movies/v1/', moviesRoutes);
app.use('/api-movies/v1/', actorRoutes);
app.use('/api-movies/v1/', characterRoutes);
app.use('/api-movies/v1/', userRoutes);
app.use('/api-movies/v1/', userMoviesRoutes);
app.use('/api-movies/v1/', rentRoutes);

app.listen(process.env.PORT, () => {
  Logger.info(`Server started on port ${process.env.PORT}`);
});
