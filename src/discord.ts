import { Client, Intents } from 'discord.js';
import { joinVoiceChannel } from '@discordjs/voice';
import Player from './Player';

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES]
});

export default (player: Player) => {

  client.on('ready', () => {
    console.log('discord bot ready');
    
    client.on('messageCreate', async message => {
      /* Join voice channel */
      if(message.content === '!p join') {
        
        if (message.member && message.member.voice.channel && message.guild) {
          
          const connection = joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.guild.id,
            // @ts-ignore https://github.com/discordjs/voice/issues/166
            adapterCreator: message.guild.voiceAdapterCreator
          });

          const channel = message.member.voice.channel;

          /* Set connection in discord player */
          player.setConnection(connection);
          
          const exitInterval = setInterval(() => {
            if (channel.members.size <= 1) {
              connection.disconnect();
              clearInterval(exitInterval);
            }
          }, 10000);
        }
        message.delete();
      }
    });
  });

  return client;
};
