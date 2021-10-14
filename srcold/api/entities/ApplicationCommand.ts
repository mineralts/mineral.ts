import { CommandType, Snowflake } from '../../types'

export default class ApplicationCommand {
  constructor (
    public scope: 'GLOBAL' | Snowflake[],
    public type: CommandType,
    public name: string,
    public description: string | null,
    public defaultPermission?: boolean
  ) {
  }
}