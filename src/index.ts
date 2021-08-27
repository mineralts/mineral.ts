import MineralClient from './client/Client'
import Logger from '@leadcodedev/logger'
import Client from './api/interfaces/Client'
import Message from './api/interfaces/Message'
import ComponentRow from './api/entities/ComponentRow'
import { ButtonStyle } from './types'
import MessageEmbed from './api/entities/MessageEmbed'
import Link from './api/entities/components/Link'
import Button from './api/entities/components/Button'
import SelectMenu from './api/entities/components/SelectMenu'

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

    const button = new Button({
      style: ButtonStyle.Primary,
      customId: 'test',
      label: 'Test button',
    })

    const button2 = new Button({
      style: ButtonStyle.Success,
      customId: 'test2',
      label: 'Test button',
    })

    const button3 = new Link({
      url: 'https://discord.com/developers/docs/interactions/message-components#component-object-component-types',
      label: 'Test button',
    })

    const action_row = new ComponentRow()
      .addComponent(button)
      .addComponent(button2)
      .addComponent(button3)

    const menu = new SelectMenu({ customId: 'menu', disabled: true })
      .addOption({ label: 'Choice 1', value: 2  })
      .addOption({ label: 'Choice 2', value: 3 })
      .addOption({ label: 'Choice 3', value: 4 })
      .addOption({ label: 'Choice 4', value: 5 })
      .addOption({ label: 'Choice 5', value: 6 })


    const menuRow = new ComponentRow()
      .addComponent(menu)

    await message.channel.send({
      content: 'ef',
      components: [action_row, menuRow],
      embeds: [embed]
    })
  })
}

test()