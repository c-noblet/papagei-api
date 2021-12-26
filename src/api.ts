import express, { Application } from 'express';
import Player from './Player';
import playerRouter from './routes/player';
import infoRouter from './routes/info';

export default (player: Player): Application => {

  const app: Application = express();

  app.use(express.json());

  /* Set up Player route */
  app.use('/play', playerRouter(player));

  app.use('/info', infoRouter());

  return app;
}
