import { CommandType, Snowflake } from '../../types'

export default class ApplicationCommand {
  constructor (
    public id: Snowflake,
    public guildId: Snowflake,
    public type: CommandType,
    public name: string,
    public description: string,
    public defaultPermission?: boolean
  ) {
  }
}