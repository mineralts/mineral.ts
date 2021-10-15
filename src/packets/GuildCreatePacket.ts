import Packet from '../decorators/Packet'
import BasePacket from './BasePacket'
import MineralClient from '../clients/MineralClient'
import User from '../api/entities/User'
import Guild from '../api/entities/Guild'
import GuildRoleManager from '../api/entities/GuildRoleManager'
import Role from '../api/entities/Role'
import GuildMemberManager from '../api/entities/GuildMemberManager'
import GuildMember from '../api/entities/GuildMember'
import GuildChannelManager from '../api/entities/GuildChannelManager'
import { ActivityType, ChannelType } from '../types'
import TextChannel from '../api/entities/TextChannel'
import GuildMemberRoleManager from '../api/entities/GuildMemberRoleManager'
import { MessageManager } from '../api/entities/MessageManager'
import Presence from '../api/entities/Presence'
import Activity from '../api/entities/Activity'
import { DateTime } from 'luxon'
import PresenceManager from '../api/entities/PresenceManager'
import EmojiManager from '../api/entities/EmojiManager'
import Emoji from '../api/entities/Emoji'
import GuildEmojiManager from '../api/entities/GuildEmojiManager'

@Packet('GUILD_CREATE')
export default class GuildCreatePacket extends BasePacket {
  public async handle (client: MineralClient, payload: any) {
    const guildRoleManager = new GuildRoleManager().register(payload.roles.flatMap((role: { [K: string]: any }) => {
      return new Role(
        role.id,
        role.name,
        role.unicode_emoji,
        role.position,
        role.permissions,
        role.mentionable,
        role.managed,
        role.icon,
        role.hoist,
        role.color
      )
    }))

    const guildMembers = new GuildMemberManager().register(payload.members.flatMap((guildMember: { [K: string]: any }) => {
      const user = new User(
        guildMember.user.id,
        guildMember.user.username,
        guildMember.user.discriminator,
        `${guildMember.user.username}#${guildMember.user.discriminator}`,
        guildMember.user.bot === true,
        guildMember.user.verified === true,
        guildMember.user.mfa_enabled === true,
        guildMember.user.flags,
        guildMember.user.email,
        guildMember.user.avatar,
        guildMember.user.banner,
      )

      return new GuildMember(
        guildMember.user.id,
        user,
        new GuildMemberRoleManager().register(guildMember.roles.flatMap((id: string) => guildRoleManager.cache.get(id))),
        payload.mute === true,
        payload.deaf === true,
        payload.hoisted_role
      )
    }))

    const guild = new Guild(
      payload.id,
      payload.name,
      payload.icon,
      payload.banner,
      payload.splash,
      payload.description,
      payload.premium_tier,
      payload.premium_subscription_count,
      payload.system_channel_flags,
      payload.explicit_content_filter,
      payload.region,
      payload.lazy,
      payload.application_id,
      payload.nsfw,
      payload.member_count,
      guildRoleManager,
      payload.stage_instances,
      payload.guild_hashes,
      payload.afk_channel_id,
      payload.public_updates_channel_id,
      new GuildChannelManager(),
      payload.verification_level,
      payload.premium_progress_bar_enabled,
      payload.features,
      payload.stickers,
      guildMembers,
      payload.rules_channel_id,
      new PresenceManager().register(payload.presences.flatMap((presence: { [K: string]: any }) => {
        return new Presence(
          guildMembers.cache.get(presence.user.id)!,
          presence.status,
          presence.client_status.web || null,
          presence.client_status.desktopn || null,
          presence.client_status.mobile || null,
          presence.activities.flatMap((activity: { [K: string]: any }) => {
            return new Activity(
              activity.id,
              ActivityType[activity.type as number] as any,
              activity.state,
              activity.name,
              activity.emoji,
              DateTime.fromMillis(activity.created_at)
            )
          })
        )
      })),
      payload.guild_scheduled_events,
      payload.default_message_notifications,
      payload.mfa_level,
      payload.threads,
      payload.max_members_size,
      new EmojiManager(),
      payload.preferred_locale,
      payload.owner_id,
      guildMembers.cache.get(payload.owner_id)!,
      payload.max_video_channel_users,
      Object.values(payload.application_command_counts).reduce((a: any, b: any) => a + b) as number,
      payload.application_command_count,
      payload.afk_timeout,
      payload.system_channel_id,
      payload.vanity_url_code,
      payload.embedded_activities
    )

    guild.emojis = new GuildEmojiManager().register(payload.emojis.map((emoji: { [K: string]: any }) => {
      return new Emoji(
        emoji.id,
        emoji.name,
        emoji.managed,
        emoji.available,
        emoji.animated,
        emoji.roles.forEach((emoji: Emoji) => guild.roles.cache.get(emoji.id))
      )
    }))

    guild.channels = new GuildChannelManager().register(payload.channels.map((channel: { [K: string]: any }) => {
      if (channel.type === ChannelType.GUILD_TEXT) {
        return new TextChannel(
          channel.id,
          channel.name,
          guild.id,
          guild,
          channel.last_message_id,
          channel.parent_id,
          channel.permission_overwrites,
          channel.position,
          channel.rate_limit_per_user,
          channel.topic,
          new MessageManager()
        )
      }
    }))

    client.cacheManager.guilds.cache.set(guild.id, guild)

    // console.log('payload', payload)

    client.send('guildCreate', guild)
  }
}