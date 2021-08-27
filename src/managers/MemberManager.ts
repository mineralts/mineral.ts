import Client from '../client/Client'
import Collection from '@discordjs/collection'
import { Snowflake } from '../types'
import Member from '../api/entities/Member'
import Role from '../api/entities/Role'
import User from '../api/entities/User'
import CachedRoles from '../api/entities/CachedRoles'

export default class MemberManager {
  public memberCollection: Collection<Snowflake, Member> = new Collection()
  public roleCollection: Collection<Snowflake, Role> = new Collection()

  constructor (private client: Client) {
  }

  public insertIntoCache (payload: any) {
    payload.roles.forEach((roleId: any) => {
      const role = this.client.cacheManager.roles.get(roleId)
      if (!role) {
        return
      }
      this.roleCollection.set(role.id, role)
    })

    this.memberCollection.set(payload.user.id, new Member(
      new User(
        payload.user.id,
        payload.user.username,
        this.client.restManager.user.getAvatar(payload.user.id, payload.user.avatar, 'webp', 256),
        this.client.restManager.user.getDefaultAvatar(payload.user.discriminator % 5),
        payload.user.email,
        payload.public_flags,
        payload.user.verified,
        payload.user.discriminator,
        payload.user.mfa_enabled,
        payload.user.bot,
      ),
      new CachedRoles(this.memberCollection)
    ))

    this.client.cacheManager.members = this.client.cacheManager.members.concat(this.memberCollection)
  }
}