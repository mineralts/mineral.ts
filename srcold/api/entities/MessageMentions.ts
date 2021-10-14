import Collection from '@discordjs/collection'
import { Snowflake } from '../../types'
import Channel from './Channel'
import Role from './Role'
import GuildMember from './GuildMember'

export default class MessageMentions {
  constructor (
    public channels: Collection<Snowflake, Channel>,
    public roles: Collection<Snowflake, Role>,
    public members: Collection<Snowflake, GuildMember>,
    public everyone: boolean,
  ) {
  }
}