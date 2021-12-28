import { VoiceConnection, createAudioPlayer, AudioPlayer, createAudioResource, AudioPlayerStatus } from "@discordjs/voice";
import internal from "stream";
import ytdl from "ytdl-core";

export default class Player {
  
  connection: VoiceConnection | null;
  discordPlayer: AudioPlayer | null;
  silenceInterval: any; 

  constructor() {
    this.discordPlayer = null;
    this.connection = null;
  }

  setConnection(connection: VoiceConnection): void {
    this.connection = connection;
    this.setSilenceInterval();
  }

  playYouTubeVideo(id: string): void {
    try {
      clearInterval(this.silenceInterval);

      /* Get youtube video stream */
      const url = `https://youtu.be/${id}`;
      const stream = ytdl(url, { 
        filter: 'audioonly'
      });

      this.play(stream);

    } catch (error) {
      console.log(error);
    }
  }

  setSilenceInterval() {
    const self: Player = this;
    this.silenceInterval = setInterval(() => {
      self.play('../silence.wav');
    }, 300000); // 5 min -> 300000
  }

  play(stream: string | internal.Readable) {
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

    const self: Player = this;

    this.discordPlayer.on(AudioPlayerStatus.Idle, () => {
      self.discordPlayer?.stop();
    });
  }
}
