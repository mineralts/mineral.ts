import Client from '../client/Client'
import SlashCommand from '../api/entities/SlashCommand'
import Collection from '@discordjs/collection'
import axios from 'axios'

export default class ApplicationCommandManager {
  public slashCommands: Collection<string, SlashCommand> = new Collection()

  constructor (private client: Client) {
  }

  public registerSlashCommands (...commands: SlashCommand[]) {
    commands.forEach((command: SlashCommand) => {
      this.slashCommands.set(command.name, command)
    })
    return this
  }

  public async init () {
    this.slashCommands.map(async (command: SlashCommand) => {
    console.log(this.client.application?.id, command.guildId)
      try {
        await axios.post(`https://discord.com/api/v8/applications/${this.client.application?.id}/guilds/${command.guildId}/commands`)
      } catch (e) {
        console.log(e.response.data.errors.application_id)
      }
    })
  }
}