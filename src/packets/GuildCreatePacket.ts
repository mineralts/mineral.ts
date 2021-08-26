import BasePacket from './BasePacket'
import Client from '../client/Client'
import Channel from '../api/entities/Channel'
import { NumericChannelInstance, Snowflake } from '../types'
import TextChannel from '../api/entities/channels/TextChannel'
import CategoryChannel from '../api/entities/channels/CategoryChannel'
import ThreadChannel from '../api/entities/channels/ThreadChannel'
import Guild from '../api/entities/Guild'
import Collection from '@discordjs/collection'
import VoiceChannel from '../api/entities/channels/VoiceChannel'
import Member from '../api/entities/Member'
import CachedRoles from '../api/entities/CachedRoles'
import axios from 'axios'
import NewsChannel from '../api/entities/channels/NewsChannel'
import StageChannel from '../api/entities/channels/StageChannel'
import Role from '../api/entities/Role'
import User from '../api/entities/User'

export default class GuildCreatePacket implements BasePacket {
  public packetType: string = 'GUILD_CREATE'

  public async handle (client: Client, payload: any): Promise<void> {
    client.channelManager.insertIntoCache(payload.channels)

    const roles: Collection<Snowflake, Role> = new Collection()
    payload.roles.forEach((role: any) => {
      roles.set(role.id, new Role(
        role.id,
        role.name,
        role.color,
        role.hoist,
        role.position,
        role.permissions,
        role.managed,
        role.mentionable,
      ))
    })

    client.cacheManager.roles = client.cacheManager.roles.concat(roles)

    const members: Collection<Snowflake, Member> = new Collection()
    payload.members.forEach((member) => {
      const memberRoles: Collection<Snowflake, any> = new Collection()
      member.roles.forEach((roleId: any) => {
        const role = client.cacheManager.roles.get(roleId)
        if (!role) {
          return
        }
        memberRoles.set(role.id, new Role(
          role.id,
          role.name,
          role.color,
          role.hoist,
          role.position,
          role.permissions,
          role.managed,
          role.isMentionable,
        ))
      })

      members.set(member.user.id, new Member(
        new User(
          member.user.id,
          member.user.username,
          client.restManager.user.getAvatar(member.user.id, member.user.avatar, 'webp', 256),
          client.restManager.user.getDefaultAvatar(member.user.discriminator % 5),
          member.user.email,
          member.flags,
          member.user.verified,
          member.user.discriminator,
          member.user.mfa_enabled,
          member.user.bot,
        ),
        new CachedRoles(memberRoles)
      ))
    })

    client.cacheManager.members = client.cacheManager.members.concat(members)
    payload.threads.forEach((channel: Channel) => {
      const instance = new ThreadChannel(
        payload.id,
        payload.type,
        payload.name,
        payload.thread_metadata,
        payload.rate_limit_per_user,
        payload.owner_id,
        payload.message_count,
        payload.member_count,
        payload.last_message_id,
        payload.guild_id,
      )
      client.cacheManager.channels.set(channel.id, instance)
    })

    const guild = new Guild(
      payload.id,
      payload.icon,
      payload.name,
      payload.description,
      payload.banner,
      payload.member_count,
      client.cacheManager.members.get(payload.owner_id)!,
      members,
      client.channelManager.channelCollection,
      payload.verification_level,
      payload.premium_tier,
      payload.premium_subscription_count,
      payload.explicit_content_filter,
      payload.max_video_channel_users,
      payload.splash,
      payload.stickers,
      payload.unavailable,
      payload.voice_states,
      payload.region,
      client.cacheManager.channels.get(payload.rule_channel_id),
    )

    client.cacheManager.guilds.set(payload.id, guild)

    client.emit('guildCreate', guild)
  }
}