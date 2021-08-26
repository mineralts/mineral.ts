import MineralClient from './client/Client'
import Logger from '@leadcodedev/logger'
import Client from './api/interfaces/Client'
import Message from './api/interfaces/Message'
import MessageEmbed from './api/entities/MessageEmbed'
const token = 'Nzg1ODgxOTk1NDc2ODYwOTc5.X8-TpA.cYGqnporjwOBgpalYIs7vQ7sCOo'

async function test() {
  const client = new MineralClient(token)

  await client.login()

  client.on('ready', (client: Client) => {
    Logger.send('info', `${client.user.username} was started`)
  })

  client.on('messageCreate', async (message: Message) => {
    if (message.author.user.isBot) {
      return
    }

    console.log(message.author.user)

    const embed = new MessageEmbed()
      .setTitle('Test')
      .setDescription('Description')
      .setColor('#ffffff')
      .addField('test field', 'field value')
      .addField('test field', 'field value', true)
      .addField('test field', 'field value', true)
      .setAuthor({
        name: message.author.user.username,
        icon_url: message.author.user.avatar,
      })
      .setImage({ url: 'https://media.giphy.com/media/2diYvJgLHN5bkqVMuf/giphy.gif' })
      .setThumbnail({ url: message.author.user.avatar })
      .setUrl('https://discord.js.org/#/docs/main/stable/class/MessageEmbed?scrollTo=provider')
      .setFooter({ text: message.author.user.username, iconUrl: message.author.user.avatar })
      .setTimestamp()

    console.log(embed)

    await message.channel.send({
      content: 'ef',
      embeds: [embed],
    })
  })
}

test()