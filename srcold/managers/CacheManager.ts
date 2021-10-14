import { Snowflake } from '../types'
import Collection from '@discordjs/collection'
import Channel from '../api/entities/Channel'
import Guild from '../api/entities/Guild'
import Role from '../api/entities/Role'
import GuildMember from '../api/entities/GuildMember'
import Message from '../api/entities/Message'
import Emoji from '../api/entities/Emoji'

export default class CacheManager {
  public channels: Collection<Snowflake, Channel> = new Collection()
  public roles: Collection<Snowflake, Role> = new Collection()
  public members: Collection<Snowflake, GuildMember> = new Collection()
  public guilds: Collection<Snowflake, Guild> = new Collection()
  public messages: Collection<Snowflake, Message> = new Collection()
  public emojis: Collection<Snowflake, Emoji> = new Collection()
}