import Client from '../client/Client'
import SlashCommand from '../api/entities/SlashCommand'
import Collection from '@discordjs/collection'
import axios from 'axios'
import { Snowflake } from '../types'

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
      try {
        if (command.scope === 'GLOBAL') {
          await axios.post(`https://discord.com/api/v8/applications/${this.client.application?.id}/commands`, command)
        } else {
          await Promise.all(
            command.scope.map((guildId: Snowflake) => {
              return axios.post(`https://discord.com/api/v8/applications/${this.client.application?.id}/guilds/${guildId}/commands`, command)
            })
          )
        }
      } catch (e) {
        console.log(e.response.data.errors.options[0].options[2].choices[0].value._errors)
      }
    })
  }
}