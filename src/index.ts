import MineralClient from './clients/MineralClient'
import ClientUser from './api/entities/ClientUser'
import Logger from '@leadcodedev/logger'
import CommandInteraction from './api/entities/interactions/CommandInteraction'

(async () => {
  const client = new MineralClient('', {
    intents: 'ALL',
  })

  client.on('ready', async (clientUser: ClientUser) => {
    Logger.send('info', `${clientUser.user.username} is ready.`)
  })

  client.on('interactionCommandCreate', async (interaction: CommandInteraction) => {
    console.log(interaction)
  })

  await client.login()
})()
