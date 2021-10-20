import Channel from './Channel'
import { Snowflake } from '../../../types'

export class CategoryChannel extends Channel {
  constructor (
    id: Snowflake,
    public name: string,
  ) {
    super(id, 'GUILD_CATEGORY')
  }
}