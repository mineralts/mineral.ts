import MineralClient from './client/Client'
import Logger from '@leadcodedev/logger'
import Client from './api/interfaces/Client'
import Message from './api/interfaces/Message'
import { Intent } from './types'
import MessageEmbed from './api/entities/MessageEmbed'
import Interaction from './api/interfaces/Interaction'
import GuildMember from './api/interfaces/GuildMember'
import VoiceChannel from './api/entities/channels/VoiceChannel'
import SlashCommand from './api/entities/SlashCommand'
import SubCommand from './api/entities/arguments/SubCommand'
import UserArgument from './api/entities/arguments/UserArgument'
import ChannelArgument from './api/entities/arguments/ChannelArgument'
import ChoiceArgument from './api/entities/arguments/ChoiceArgument'
import SelectMenu from './api/entities/components/SelectMenu'

const token = 'Nzg1ODgxOTk1NDc2ODYwOTc5.X8-TpA.hRS4J8VhrEV3bWy5xgpOvcVbTt8'

async function test() {

  const client = new MineralClient(token, {
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

  const command = new SlashCommand({ name: 'server', scope: ['583050048766476353'], description: 'Commands for minecraft server.', options: [
    new SubCommand({ name: 'get-profil', description: 'Get user game profil from database', options: [
      new UserArgument({ name: 'member', description: 'target user', required: true }),
      new ChannelArgument({ name: 'channel', description: 'target channel', required: true }),
      new ChoiceArgument({ name: 'estttt', description: 'efefef', required: true })
        .addOption({ name: 'test 1', value: 1 })
        .addOption({ name: 'test 2', value: 32 })
    ]})
  ]})


  await client.login()
  client.commandManager.registerSlashCommands(command)

  client.on('ready', async (a: Client) => {
    Logger.send('info', `${a.user.username} was started`)
  })

  client.on('debug', (payload: any) => {
    Logger.send('info', 'Debug mode')
    console.log(payload)
  })

  client.on('messageCreate', async (message: Message) => {
    if (message.author.user.isBot) {
      return
    }

    const embed = new MessageEmbed()
      .setTitle('Test')
      .setDescription('Description')
      .setColor('#ffffff')
      .addField('test field', 'field value')
      .addField('test field', 'field value', true)
      .addField('test field', 'field value', true)
      .setAuthor({ name: message.author.user.username, icon_url: message.author.user.avatar })
      .setImage({ url: 'https://media.giphy.com/media/2diYvJgLHN5bkqVMuf/giphy.gif' })
      .setThumbnail({ url: message.author.user.avatar })
      .setUrl('https://discord.js.org/#/docs/main/stable/class/MessageEmbed?scrollTo=provider')
      .setFooter({ text: message.author.user.username, iconUrl: message.author.user.avatar })
      .setTimestamp()

    const menu = new SelectMenu({ customId: 'tsdede' })
      .addOption({ label: 'Test 1', description: 'testtt', value: 1 })
      .addOption({ label: 'Test 3', description: 'tesddttt', value: 2 })

  })

  client.on('interactionCreate', async (interaction: Interaction) => {
    await interaction.reply({
      content: interaction.version,
      ephemeral: true,
    })

    // await interaction.edit({
    //   content: 'New content'
    // })
  })

  client.on('guildBoostAdd', async (member: GuildMember) => {
    console.log(member.user.username)
  })

  // client.on('voiceStateUpdate', async (before: GuildMember, after: GuildMember) => {
    // console.log(before.sessionId, after.sessionId)
  // })

  client.on('voiceJoin', async (member: GuildMember) => {
    console.log(`${member.user.username} has join the channel ${member.voiceChannel.name}`)
  })

  client.on('voiceLeave', async (member: GuildMember, voiceChannel: VoiceChannel) => {
    console.log(`${member.user.username} has left the ${voiceChannel.name} channel`)
  })
}

test()