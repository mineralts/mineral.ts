import { Snowflake } from '../../types'
import User from './User'
import GuildMemberRoleManager from './GuildMemberRoleManager'

export default class GuildMember {
  constructor (
    public id: Snowflake,
    public user: User,
    public roles: GuildMemberRoleManager
  ) {
  }
}