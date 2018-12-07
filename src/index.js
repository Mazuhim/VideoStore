import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import moviesRoutes from './routes/movies';
import actorRoutes from './routes/actor';
import characterRoutes from './routes/characters';
import Logger from './helpers/Logger';

require('dotenv').config();

const app = express();
app.use(helmet());
app.use(bodyParser.json({
  // limit: process.env.BODY_LIMIT,
}));

// LoggerConfig.expressRequest(app);

app.get('/api-movies/status', (req, res) => {
  res.send('ok');
});

app.use('/api-movies/v1/', moviesRoutes);
app.use('/api-movies/v1/', actorRoutes);
app.use('/api-movies/v1/', characterRoutes);

app.listen(process.env.PORT, () => {
  Logger.info(`Server started on port ${process.env.PORT}`);
});
