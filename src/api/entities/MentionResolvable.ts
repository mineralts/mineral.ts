import Collection from '@discordjs/collection'
import Role from './Role'
import GuildMember from './GuildMember'
import { Snowflake } from '../../types'

export class MentionResolvable {
  constructor (
    public isEveryone: boolean,
    public roles: Collection<Snowflake, Role>,
    /**
     * @todo Add channels mention
     * public channels: Collection<Snowflake, ChannelResolvable>,
     */
    public member: Collection<Snowflake, GuildMember>,
  ) {
  }
}