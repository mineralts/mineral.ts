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
import { ActivityType, ChannelResolvable, ChannelType, PresenceStatus, Snowflake } from '../types'
import TextChannel from '../api/entities/channels/TextChannel'
import GuildMemberRoleManager from '../api/entities/GuildMemberRoleManager'
import { MessageManager } from '../api/entities/MessageManager'
import Presence from '../api/entities/Presence'
import Activity from '../api/entities/Activity'
import { DateTime } from 'luxon'
import Emoji from '../api/entities/Emoji'
import NewsChannel from '../api/entities/channels/NewsChannel'
import { keyFromEnum } from '../utils'
import Collection from '@discordjs/collection'
import GuildEmojiManager from '../api/entities/GuildEmojiManager'
import VoiceChannel from '../api/entities/channels/VoiceChannel'
import CategoryChannel from '../api/entities/channels/CategoryChannel'

@Packet('GUILD_CREATE')
export default class GuildCreatePacket extends BasePacket {
  private guildMembers: Collection<Snowflake, GuildMember> = new Collection()
  private presences: Collection<Snowflake, Presence> = new Collection()
  private roles: Collection<Snowflake, Role> = new Collection()
  private emojis: Collection<Snowflake, Emoji> = new Collection()
  private channels: Collection<Snowflake, ChannelResolvable> = new Collection()
  private guild!: Guild

  public async handle (client: MineralClient, payload: any) {
    this.createRoles(payload)
    this.createGuild(payload)
    this.createGuidMembers(payload)
    this.createChannel(payload)
    this.createEmojis(payload)
    this.createPresences(payload)

    this.channels.forEach((channel: ChannelResolvable) => {
      if (!(channel instanceof CategoryChannel)) {
        channel.parent = this.channels.get(channel.parentId)
      }
    })

    this.guildMembers.forEach((member: GuildMember) => {
      member.user.presence = this.presences.get(member.user.id)
    })

    this.guild.owner = this.guildMembers.get(payload.owner_id)
    this.guild.members.register(this.guildMembers)
    this.guild.channels.register(this.channels)
    this.guild.emojis.register(this.emojis)
    this.guild.roles.register(this.roles)

    client.cacheManager.guilds.cache.set(this.guild.id, this.guild)

    client.emit('guildCreate', this.guild)
  }

  protected createChannel (payload) {
    payload.channels.forEach((item: any) => {
      let channel!: ChannelResolvable
      if (item.type === ChannelType.GUILD_TEXT) {
        channel = new TextChannel(
          item.id,
          item.name,
          this.guild.id,
          this.guild,
          item.last_message_id,
          undefined,
          item.parent_id,
          item.permission_overwrites,
          item.position,
          item.rate_limit_per_user,
          item.topic,
          new MessageManager(),
          undefined
        )
      }

      if (item.type === ChannelType.GUILD_NEWS) {
        channel = new NewsChannel(
          item.id,
          item.name,
          this.guild.id,
          this.guild,
          item.last_message_id,
          undefined,
          item.parent_id,
          item.permission_overwrites,
          item.position,
          item.rate_limit_per_user,
          item.topic,
          new MessageManager()
        )
      }

      if (item.type === ChannelType.GUILD_VOICE) {
        channel = new VoiceChannel(
          item.id,
          item.name,
          this.guild.id,
          this.guild,
          item.user_limit,
          item.rtc_region,
          item.rate_limit_per_user,
          item.position,
          item.permission_overwrites,
          item.parent_id,
          item.bitrate,
          undefined,
        )
      }

      if (item.type === ChannelType.GUILD_CATEGORY) {
        channel = new CategoryChannel(
          item.id,
          item.name,
          this.guild.id,
          this.guild,
        )
      }

      if (channel) {
        this.channels.set(channel.id, channel)
      }
    })
  }

  protected createGuidMembers (payload) {
    payload.members.forEach((member: any) => {
      const user = this.createUser(member.user)
      const guildMember = new GuildMember(
        member.user.id,
        member.nick || user.username,
        user,
        new GuildMemberRoleManager(),
        member.highest_role
          ? this.roles.get(member.highest_role)!
          : null,
        member.is_pending,
        undefined,
        DateTime.fromISO(payload.joined_at),
      )

      this.guildMembers.set(guildMember.id, guildMember)
    })
  }

  protected createUser (payload) {
    return new User(
      payload.id,
      payload.username,
      payload.discriminator,
      `${payload.username}#${payload.discriminator}`,
      payload.bot === true,
      payload.premium_since
        ? DateTime.fromISO(payload.premium_since)
        : undefined,
      payload.verified === true,
      payload.mfa_enabled === true,
      payload.public_flags,
      payload.email,
      payload.avatar,
      payload.banner,
      undefined,
    )
  }

  protected createEmojis (payload) {
    payload.emojis.forEach((item) => {
      const emoji = new Emoji(
        item.id,
        item.name,
        item.managed,
        item.available,
        item.animated,
        item.roles.map((role: any) => this.roles.get(role.id))
      )
      this.emojis.set(emoji.id, emoji)
    })
  }

  protected createRoles (payload: any) {
    payload.roles.forEach((item: any) => {
      const role = new Role(
        item.id,
        item.name,
        item.unicode_emoji,
        item.position,
        item.permissions,
        item.mentionable,
        item.managed,
        item.icon,
        item.hoist,
        item.color
      )
      this.roles.set(role.id, role)
    })
  }

  protected createPresences (payload) {
    payload.presences.forEach((item: any) => {
      const presence = new Presence(
        this.guildMembers.get(item.user.id)!,
        keyFromEnum(PresenceStatus, item.status) as keyof typeof PresenceStatus,
        item.client_status.web || null,
        item.client_status.desktop || null,
        item.client_status.mobile || null,
        item.activities.flatMap((activity: any) => this.createActivity(activity))
      )

      this.presences.set(presence.member.user.id, presence)
    })
  }

  protected createActivity (payload) {
    return new Activity(
      payload.id,
      ActivityType[payload.type as number] as any,
      payload.state,
      payload.name,
      payload.emoji,
      DateTime.fromMillis(payload.created_at)
    )
  }

  protected createGuild (payload) {
    this.guild = new Guild(
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
      new GuildRoleManager(),
      payload.stage_instances,
      payload.guild_hashes,
      payload.afk_channel_id,
      payload.public_updates_channel_id,
      new GuildChannelManager(),
      payload.verification_level,
      payload.premium_progress_bar_enabled,
      payload.features,
      payload.stickers,
      new GuildMemberManager(),
      payload.rules_channel_id,
      payload.guild_scheduled_events,
      payload.default_message_notifications,
      payload.mfa_level,
      payload.threads,
      payload.max_members_size,
      new GuildEmojiManager(),
      payload.preferred_locale,
      payload.owner_id,
      this.guildMembers.get(payload.owner_id),
      payload.max_video_channel_users,
      Object.values(payload.application_command_counts).reduce((a: any, b: any) => a + b) as number,
      payload.application_command_count,
      payload.afk_timeout,
      payload.system_channel_id,
      payload.vanity_url_code,
      payload.embedded_activities
    )
  }
}