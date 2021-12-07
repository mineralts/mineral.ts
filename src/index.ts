import MineralClient from './clients/MineralClient'
import ClientUser from './api/entities/ClientUser'
import GuildMember from './api/entities/GuildMember'
import Invite from './api/entities/Invite'
import TextChannel from './api/entities/channels/TextChannel'
import Message from './api/entities/Message'
import Logger from '@leadcodedev/logger'

(async () => {
  const client = new MineralClient('Nzg1ODgxOTk1NDc2ODYwOTc5.X8-TpA.oYH7fxOU5Ab4KEdrlCGRAfqYR5s', {
    intents: 'ALL',
  })

  client.on('ready', async (clientUser: ClientUser) => {
    Logger.send('info', `${clientUser.user.username} is ready.`)
  })

  client.on('typingStart', (member: GuildMember, channel: TextChannel) => {
    Logger.send('info', `${member.username} écrit dans le channel ${channel.name}`)
  })

  client.on('messageCreate', async (message: Message) => {
    if (message.author?.user.isBot) {
      return
    }

    const member = message.channel.guild.members.cache.get('240561194958716928')
    await member?.voice?.move('902213163951456276')
  })

  client.on('guildMemberJoin', async (member: GuildMember, invite?: Invite) => {
    const channel = member.guild.channels.cache.get('907005231026548766') as TextChannel
    await channel.send({
      content: `${member.username} a été invité par ${invite?.owner.username} (${invite?.count} invitations)`
    })
  })

  await client.login()
})()
