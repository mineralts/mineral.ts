import Role from './Role'
import GuildMember from './GuildMember'
import { Snowflake } from '../../types'
import Channel from './channels/Channel'
import Collection from '../../Collection'

export class MentionResolvable {
  constructor (
    public isEveryone: boolean,
    public roles: Collection<Snowflake, Role>,
    public members: Collection<Snowflake, GuildMember>,
    public channels: Collection<Snowflake, Channel>
  ) {
  }
}