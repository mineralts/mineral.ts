import Client from '../client/Client'
import Collection from '@discordjs/collection'
import { Snowflake } from '../types'
import GuildMember from '../api/entities/GuildMember'
import Role from '../api/entities/Role'
import User from '../api/entities/User'
import CachedRoles from '../api/entities/CachedRoles'

export default class MemberManager {
  public memberCollection: Collection<Snowflake, GuildMember> = new Collection()
  public roleCollection: Collection<Snowflake, Role> = new Collection()

  constructor (private client: Client) {
  }

  public insertIntoCache (guildId: Snowflake, payload: any) {
    payload.forEach((member: any) => {
      member.roles.forEach((roleId: any) => {
        const role = this.client.cacheManager.roles.get(roleId)
        if (role) {
          this.roleCollection.set(role.id, role)
        }
      })

      this.memberCollection.set(member.user.id, new GuildMember(
        new User(
          member.user.id,
          member.user.username,
          this.client.restManager.user.getAvatar(member.user.id, member.user.avatar, 'webp', 256),
          this.client.restManager.user.getDefaultAvatar(member.user.discriminator % 5),
          member.user.email,
          member.public_flags,
          member.user.verified,
          member.user.discriminator,
          member.user.mfa_enabled,
          member.premium_since,
          member.user.bot,
        ),
        new CachedRoles(this.roleCollection),
        null,
        null,
        member.deaf,
        member.mute,
      ))
    })

    this.client.cacheManager.members = this.client.cacheManager.members.concat(this.memberCollection)
    return this.client.cacheManager.members
  }
}