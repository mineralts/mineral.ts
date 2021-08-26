import Collection from '@discordjs/collection'
import { Snowflake } from '../../types'
import Channel from './Channel'
import Role from './Role'
import Member from './Member'

export default class MessageMentions {
  constructor (
    public channels: Collection<Snowflake, Channel>,
    public roles: Collection<Snowflake, Role>,
    public members: Collection<Snowflake, Member>,
    public everyone: boolean,
  ) {
  }
}