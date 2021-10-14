import MineralClient from './clients/MineralClient'
import Guild from './api/entities/Guild'
import ClientUser from './api/entities/ClientUser'
import { Intent } from './types'

(async () => {
  const client = new MineralClient('token', {
    intents: [
      Intent.GUILDS,
      Intent.GUILD_MEMBERS,
      Intent.GUILD_BANS,
      Intent.GUILD_EMOJIS_AND_STICKERS,
      Intent.GUILD_INTEGRATIONS,
      Intent.GUILD_WEBHOOKS,
      Intent.GUILD_INVITES,
      Intent.GUILD_VOICE_STATES,
      Intent.GUILD_PRESENCES,
      Intent.GUILD_MESSAGES,
      Intent.GUILD_MESSAGE_REACTIONS,
      Intent.GUILD_MESSAGE_TYPING,
      Intent.DIRECT_MESSAGES,
      Intent.DIRECT_MESSAGE_REACTIONS,
      Intent.DIRECT_MESSAGE_TYPING,
    ],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
  })

  client.listen('ready', async (clientUser: ClientUser) => {
    // console.log('clientUser', clientUser)
  })

  client.listen('guildCreate', async (guild: Guild) => {
    console.log('guild', guild.channels)
  })

  await client.login()
})()
