import { VoiceConnection, createAudioPlayer, AudioPlayer, createAudioResource } from "@discordjs/voice";
import ytdl from "ytdl-core";

export default class Player {
  
  connection: VoiceConnection | null;
  isPlaying: boolean;
  discordPlayer: AudioPlayer | null;

  constructor() {
    this.discordPlayer = null;
    this.connection = null;
    this.isPlaying = false;
  }

  setConnection(connection: VoiceConnection): void {
    this.connection = connection;
  }

  playYouTubeVideo(id: string): void {
    try {
      this.isPlaying = true;

      /* Get youtube video stream */
      const url = `https://youtu.be/${id}`;
      const stream = ytdl(url, { 
        filter: 'audioonly'
      });

      const resource = createAudioResource(stream, {
        inlineVolume: true,
      });
      resource.volume?.setVolume(0.5);
      
      /* Create the discord player */
      this.discordPlayer = createAudioPlayer();
      if (this.connection) {
        this.connection.subscribe(this.discordPlayer);
      }

      /* Play the stream */
      this.discordPlayer.play(resource);
      this.isPlaying = false;
    } catch (error) {
      console.log(error);
    }
  }
}
