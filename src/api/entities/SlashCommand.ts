import ApplicationCommand from './ApplicationCommand'
import { CommandType, Snowflake } from '../../types'

export default class SlashCommand extends ApplicationCommand {
  constructor (
    id: Snowflake,
    guildId: Snowflake,
    name: string,
    description: string,
    public options: any,
    type = CommandType.CHAT_INPUT,
    defaultPermission: boolean = true
  ) {
    super(id, guildId, type, name, description, defaultPermission)
  }
}