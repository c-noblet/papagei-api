import 'dotenv/config';
import http from 'http';
import https from 'https';
import path from 'path';
import fs from 'fs';
import setBot from './discord';
import Player from './Player';
import setApi from './api';

/* Discord Player initialisation */
const player = new Player();

/* Get SSL */
const privateKey = process.env.SSL_PRIVATE_KEY_PATH;
const publicKey = process.env.SSL_PUBLIC_KEY_PATH;
let credentials = {};

if (privateKey && publicKey) {
  credentials = {
    key: fs.readFileSync(path.resolve() + privateKey),
    cert: fs.readFileSync(path.resolve() + publicKey),
  }
}

try {

  /* Start the discord bot */
  const client = setBot(player);
  client.login(process.env.DISCORD_TOKEN);

  /* Start the API */
  const app = setApi(player);
  const httpServer = http.createServer(app);
  const httpsServer = https.createServer(credentials, app);

  httpServer.listen(8080);
  httpsServer.listen(8443);

} catch (err) {
  console.error(err);
}
