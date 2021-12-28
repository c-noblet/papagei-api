import 'dotenv/config';
import http from 'http';
import setBot from './discord';
import Player from './Player';
import setApi from './api';

/* Discord Player initialisation */
const player = new Player();

try {

  /* Start the discord bot */
  const client = setBot(player);
  client.login(process.env.DISCORD_TOKEN);

  /* Start the API */
  const app = setApi(player);
  const httpServer = http.createServer(app);
  httpServer.listen(8080);

} catch (err) {
  console.error(err);
}
