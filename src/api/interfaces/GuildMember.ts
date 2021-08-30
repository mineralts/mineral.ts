import User from './User'
import Role from '../entities/Role'
import Cache from './Cache'
import Guild from './Guild'

export default interface GuildMember {
  user: User
  roles: Cache<Role>
  guild: Cache<Guild>
}