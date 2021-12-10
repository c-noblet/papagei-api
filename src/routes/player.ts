import { Router } from 'express';
import Player from '../Player';

export default (player: Player) => {

  const router = Router();
  
  /* Get youtube video and play it */
  router.get('/:id', (req, res) => {
    try {
      const id = req.params.id;
      player.playYouTubeVideo(id);
      res.send('playing');
    } catch (err) {
      res.send('error');
    }
  });

  return router;
}
