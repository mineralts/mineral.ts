import ApplicationCommand from './ApplicationCommand'
import { CommandType, Snowflake } from '../../types'
import SubCommand from './arguments/SubCommand'
import UserArgument from './arguments/UserArgument'

export default class SlashCommand extends ApplicationCommand {
  public options: any[]

  constructor (commandOptions: {
    scope?: Snowflake[],
    name: string,
    description: string,
    options: (SubCommand | UserArgument)[],
    defaultPermission?: boolean
  }) {
    super(commandOptions.scope || 'GLOBAL', CommandType.CHAT_INPUT, commandOptions.name.toLowerCase(), commandOptions.description, commandOptions.defaultPermission || true)
    this.options = commandOptions.options
  }
}