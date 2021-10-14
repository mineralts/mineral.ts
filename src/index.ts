import MineralClient from './clients/MineralClient'
import Guild from './api/entities/Guild'
import ClientUser from './api/entities/ClientUser'
import { Intent } from './types'
import Logger from '@leadcodedev/logger'

(async () => {
  const client = new MineralClient('Nzg1ODgxOTk1NDc2ODYwOTc5.X8-TpA.hRS4J8VhrEV3bWy5xgpOvcVbTt8', {
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
    Logger.send('info', `${clientUser.user.username} is ready.`)

  })

  client.listen('guildCreate', async (guild: Guild) => {
    // console.log('guild', guild.owner.roles)
  })

  await client.login()
})()
