import {
  ExplicitContentLevel, Feature,
  GuildFeature, LocalPath,
  Milliseconds,
  NotificationLevel,
  Region, RequestOptions,
  Snowflake,
  SystemChannelFlag, Url
} from '../../types'
import GuildHashes from './GuildHashes'
import GuildStickerManager from './GuildStickerManager'
import GuildThreadManager from './GuildThreadManager'
import GuildEmojiManager from './GuildEmojiManager'
import GuildRoleManager from './GuildRoleManager'
import GuildMemberManager from './GuildMemberManager'
import GuildChannelManager from './GuildChannelManager'
import GuildMember from './GuildMember'
import Request from '../../sockets/Request'
import Context from '../../Context'
import VoiceChannel from './VoiceChannel'
import PresenceManager from './PresenceManager'
import { VerificationLevel } from '../../../srcold/types'
import fs from 'fs'
import { join } from 'path'
import Logger from '@leadcodedev/logger'
import TextChannel from './TextChannel'
import axios from 'axios'

export default class Guild {
  constructor (
    public id: Snowflake,
    public name: string,
    public icon: string | null,
    public banner: string | null,
    public splash: string | null,
    public description: string | null,
    public premiumTier: number,
    public premiumSubscriptionCount: number,
    public systemChannelFlags: number,
    public explicitContentFilter: number,
    public region: string,
    public isLazy: boolean,
    public applicationId: string | null,
    public isNSFW: boolean,
    public memberCount: number,
    public roles: GuildRoleManager,
    public stageInstances: [],
    public guildHashes: GuildHashes,
    public afkChannelId: Snowflake,
    public publicUpdateChannelId: Snowflake,
    public channels: GuildChannelManager,
    public verificationLevel: number,
    public hasPremiumProgressBarEnabled: boolean,
    public features: GuildFeature[],
    public stickers: GuildStickerManager,
    public members: GuildMemberManager,
    public ruleChannelId: Snowflake,
    public presences: PresenceManager,
    public guildScheduledEvents: any[],
    public defaultMessageNotifications: number,
    public MFALevel: number,
    public threads: GuildThreadManager,
    public maxMemberSize: number,
    public emojis: GuildEmojiManager,
    public defaultLang: string,
    public ownerId: Snowflake,
    public owner: GuildMember,
    public maxVideoChannelUsers: number,
    public registeredCommandCount: number,
    public applicationCommandCount: number,
    public afkTimeout: number,
    public systemChannelId: Snowflake,
    public vanityUrlCode: string | null,
    public embeddedActivities: any[]
  ) {
  }

  public async setName (value: string, options?: RequestOptions): Promise<void> {
    const request = new Request(`/guilds/${this.id}`)
    await request.patch({ name: value }, options)
  }

  public async setPreferredLocale (region: keyof typeof Region, options?: RequestOptions): Promise<void> {
    const request = new Request(`/guilds/${this.id}`)
    await request.patch({ preferred_locale: region }, options)
  }

  public async leave (options?: RequestOptions): Promise<void> {
    const client = Context.getClient()
    if (this.ownerId === client.clientUser?.user.id) {
      throw new Error('GUILD_OWNER')
    }
    const request = new Request(`/guilds/${this.id}`)
    await request.delete(options)
    client.cacheManager.guilds.cache.delete(this.id)
  }

  public async setAfkChannel (voiceChannel: VoiceChannel | Snowflake, options?: RequestOptions): Promise<void> {
    const request = new Request(`/guilds/${this.id}`)
    await request.patch({
      afk_channel_id: voiceChannel instanceof VoiceChannel
        ? voiceChannel.id
        : voiceChannel
    }, options)
  }

  public async setVerificationLevel (level: keyof typeof VerificationLevel, options?: RequestOptions): Promise<void> {
    const request = new Request(`/guilds/${this.id}`)
    await request.patch({
      verification_level: VerificationLevel[level]
    }, options)
  }

  public async setNotificationLevel (level: keyof typeof NotificationLevel, options?: RequestOptions): Promise<void> {
    const request = new Request(`/guilds/${this.id}`)
    await request.patch({
      default_message_notifications: NotificationLevel[level]
    }, options)
  }

  public async setExplicitContentFilter (level: keyof typeof ExplicitContentLevel, options?: RequestOptions): Promise<void> {
    const request = new Request(`/guilds/${this.id}`)
    await request.patch({
      explicit_content_filter: ExplicitContentLevel[level]
    }, options)
  }

  public async setAfkTimeout (value: Milliseconds, options?: RequestOptions): Promise<void> {
    const request = new Request(`/guilds/${this.id}`)
    await request.patch({
      afk_timeout: ExplicitContentLevel[value]
    }, options)
  }

  private hasFeature(feature: keyof typeof Feature): boolean {
    return this.features.includes(feature)
  }

  public async setIcon (path: LocalPath | Url, options?: RequestOptions): Promise<void> {
    const request = new Request(`/guilds/${this.id}`)
    let file: string

    if (path.startsWith('http') || path.startsWith('https')) {
      if (!this.hasFeature('ANIMATED_ICON') && path.split('.')[1] === 'gif') {
        Logger.send('error', 'You do not have permission to upload a invitation banner')
        return
      }

      const { data } = await axios(path)
      file = Buffer.from(data, 'base64').toString('base64')
    } else {
      if (!this.hasFeature('ANIMATED_ICON') && path.split('.')[1] === 'gif') {
        Logger.send('error', 'You do not have permission to upload a invitation banner')
      }

      const filePath = join(process.cwd(), path)
      file = await fs.promises.readFile(filePath, 'base64')
    }

      await request.patch({ icon: `data:image/png;base64,${file}` }, options)
  }

  public async removeIcon (options?: RequestOptions): Promise<void> {
    const request = new Request(`/guilds/${this.id}`)
    await request.patch({ icon: null }, options)
  }

  public async setOwner (member: GuildMember | Snowflake, options?: RequestOptions): Promise<void> {
    const client = Context.getClient()

    if (this.ownerId === client.clientUser?.user.id) {
      throw new Error('OWNER_IS_ALREADY_MEMBER')
    }

    const request = new Request(`/guilds/${this.id}`)
    await request.patch({
      owner_id: member instanceof GuildMember
        ? member.id
        :member
    }, options)
  }

  public async setSplash (path: string, options?: RequestOptions): Promise<void> {
    if (!this.features.includes('INVITE_SPLASH')) {
      Logger.send('error', 'You do not have permission to upload a invitation banner')
    }

    const request = new Request(`/guilds/${this.id}`)
    const filePath = join(process.cwd(), path)
    const file = await fs.promises.readFile(filePath, 'base64')

    await request.patch({ splash: `data:image/png;base64,${file}` }, options)
  }

  public async setDiscoverySplash (path: string, options?: RequestOptions): Promise<void> {
    if (!this.features.includes('DISCOVERABLE')) {
      Logger.send('error', 'You do not have permission to upload a discovery banner')
    }

    const request = new Request(`/guilds/${this.id}`)
    const filePath = join(process.cwd(), path)
    const file = await fs.promises.readFile(filePath, 'base64')

    await request.patch({ discovery_splash: `data:image/png;base64,${file}` }, options)
  }

  public async setBanner (path: string, options?: RequestOptions): Promise<void> {
    if (!this.features.includes('DISCOVERABLE')) {
      Logger.send('error', 'You do not have permission to upload a banner')
    }

    const request = new Request(`/guilds/${this.id}`)
    const filePath = join(process.cwd(), path)
    const file = await fs.promises.readFile(filePath, 'base64')

    await request.patch({ discovery_splash: `data:image/png;base64,${file}` }, options)
  }

  public async setSystemChannel (channel: TextChannel | Snowflake, options?: RequestOptions): Promise<void> {
    const request = new Request(`/guilds/${this.id}`)
    await request.patch({
      system_channel_id: channel instanceof TextChannel
        ? channel.id
        :channel
    }, options)
  }

  public async setSystemChannelFlag (flag: keyof typeof SystemChannelFlag): Promise<void> {
    const request = new Request(`/guilds/${this.id}`)
    await request.patch({ system_channel_flags: SystemChannelFlag[flag] })
  }

  public async setRuleChannel (channel: TextChannel | Snowflake, options?: RequestOptions): Promise<void> {
    const request = new Request(`/guilds/${this.id}`)
    await request.patch({
      rules_channel_id: channel instanceof TextChannel
        ? channel.id
        : channel
    }, options)
  }

  public async setPublicUpdateChannel (channel: TextChannel | Snowflake, options?: RequestOptions): Promise<void> {
    const request = new Request(`/guilds/${this.id}`)
    await request.patch({
      public_updates_channel_id: channel instanceof TextChannel
        ? channel.id
        : channel
    }, options)
  }

  public async setDescription (value: string, options?: RequestOptions): Promise<void> {
    const request = new Request(`/guilds/${this.id}`)
    await request.patch({
      description: value
    }, options)
  }
}