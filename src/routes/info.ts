import { Router } from 'express';
import ytdl from "ytdl-core";

export default () => {

  const router = Router();
  
  router.get('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const metas = await ytdl.getInfo(`https://www.youtube.com/watch?v=${id}`);
      const infos = {
        id: id,
        title: metas.videoDetails.title,
        picture: metas.videoDetails.thumbnails[0].url
      }
      res.send(infos);
    } catch (err) {
      res.send('error');
    }
  });

  return router;
}
