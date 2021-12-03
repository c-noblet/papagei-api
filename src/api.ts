import express, { Application } from 'express';
import Player from './Player';
import playerRouter from './routes/player';

export default (player: Player): Application => {

  const app: Application = express();

  app.use(express.json());

  /* Set up Player route */
  app.use('/player', playerRouter(player));

  return app;
}
