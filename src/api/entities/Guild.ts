import {
  ExplicitContentLevel, Feature,
  GuildFeature, LocalPath,
  Milliseconds,
  NotificationLevel,
  Region, RequestOptions,
  Snowflake,
  SystemChannelFlag, VerificationLevel
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
import VoiceChannel from './channels/VoiceChannel'
import fs from 'fs'
import { join } from 'path'
import Logger from '@leadcodedev/logger'
import TextChannel from './channels/TextChannel'
import Command from '../components/commands/Command'
import Invite from './Invite'
import Collection from '../../Collection'

export default class Guild {
  public commands: Collection<Snowflake, Command> = new Collection()

  constructor (
    public id: Snowflake,
    public name: string,
    public icon: string | null,
    public banner: string | null,
    public splash: string | null,
    public description: string | null,
    public readonly premiumTier: number,
    public readonly premiumSubscriptionCount: number,
    public systemChannelFlags: number,
    public explicitContentFilter: number,
    public region: keyof typeof Region,
    public readonly isLazy: boolean,
    public readonly applicationId: string | null,
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
    public guildScheduledEvents: any[],
    public defaultMessageNotifications: keyof typeof NotificationLevel,
    public MFALevel: number,
    public threads: GuildThreadManager,
    public maxMemberSize: number,
    public emojis: GuildEmojiManager,
    public defaultLang: string,
    public ownerId: Snowflake,
    public owner: GuildMember | undefined,
    public maxVideoChannelUsers: number,
    public registeredCommandCount: number,
    public applicationCommandCount: number,
    public afkTimeout: number,
    public systemChannelId: Snowflake,
    public vanityUrlCode: string | null,
    public embeddedActivities: any[],
    public hasProgressBarEnabled: boolean,
    public invites: Collection<string, Invite>,
  ) {
  }

  public async setName (value: string, options?: RequestOptions): Promise<void> {
    const request = new Request(`/guilds/${this.id}`)
    const result = await request.patch({ name: value }, options)

    if (result) {
      this.name = value
    }
  }

  public async setPreferredLocale (region: keyof typeof Region, options?: RequestOptions): Promise<void> {
    const request = new Request(`/guilds/${this.id}`)
    await request.patch({ preferred_locale: region }, options)
    this.region = region
  }

  public async leave (options?: RequestOptions): Promise<void> {
    const client = Context.getClient()
    if (this.ownerId === client.clientUser?.user.id) {
      throw new Error('GUILD_OWNER')
    }

    const request = new Request(`/guilds/${this.id}`)
    const result = await request.delete(options)
    if (result) {
      client.cacheManager.guilds.cache.delete(this.id)
    }
  }

  public async setAfkChannel (voiceChannel: VoiceChannel | Snowflake, options?: RequestOptions): Promise<void> {
    const value = voiceChannel instanceof VoiceChannel
      ? voiceChannel.id
      : voiceChannel
    const request = new Request(`/guilds/${this.id}`)

    const result = await request.patch({
      afk_channel_id: value
    }, options)

    if (result) {
      this.afkChannelId = value
    }
  }

  public async setVerificationLevel (level: keyof typeof VerificationLevel, options?: RequestOptions): Promise<void> {
    const value = VerificationLevel[level]
    const request = new Request(`/guilds/${this.id}`)
    const result = await request.patch({ verification_level: value }, options)

    if (result) {
      this.verificationLevel = value
    }
  }

  public async setNotificationLevel (level: keyof typeof NotificationLevel, options?: RequestOptions): Promise<void> {
    const request = new Request(`/guilds/${this.id}`)
    const result = await request.patch({ default_message_notifications: NotificationLevel[level] }, options)

    if (result) {
      this.defaultMessageNotifications = level
    }
  }

  public async setExplicitContentFilter (level: keyof typeof ExplicitContentLevel, options?: RequestOptions): Promise<void> {
    const explicitContentFilter = ExplicitContentLevel[level]
    const request = new Request(`/guilds/${this.id}`)
    const result = await request.patch({ explicit_content_filter: explicitContentFilter }, options)

    if (result) {
      this.explicitContentFilter = explicitContentFilter
    }
  }

  public async setAfkTimeout (value: Milliseconds, options?: RequestOptions): Promise<void> {
    const request = new Request(`/guilds/${this.id}`)
    const result = await request.patch({ afk_timeout: value }, options)

    if (result) {
      this.afkTimeout = value
    }
  }

  private hasFeature(feature: keyof typeof Feature): boolean {
    return this.features.includes(feature)
  }

  public async setIcon (path: LocalPath, options?: RequestOptions): Promise<void> {
    const request = new Request(`/guilds/${this.id}`)
    let file: string

    // if (path.startsWith('http') || path.startsWith('https')) {
    //   if (!this.hasFeature('ANIMATED_ICON') && path.split('.')[1] === 'gif') {
    //     Logger.send('error', 'You do not have permission to upload a invitation banner')
    //     return
    //   }
    //
    //   const { data } = await axios(path)
    //   file = Buffer.from(data, 'base64').toString('base64')
    // } else {
    // }

    if (!this.hasFeature('ANIMATED_ICON') && path.split('.')[1] === 'gif') {
      Logger.send('error', 'You do not have permission to upload a invitation banner')
    }

    const filePath = join(process.cwd(), path)
    file = await fs.promises.readFile(filePath, 'base64')

    const { data } = await request.patch({ icon: `data:image/png;base64,${file}` }, options)

    if (data) {
      this.icon = data.icon
    }
  }

  public async removeIcon (options?: RequestOptions): Promise<void> {
    const request = new Request(`/guilds/${this.id}`)
    const { data } =  await request.patch({ icon: null }, options)

    if (data) {
      this.icon = data.icon
    }
  }

  public async setOwner (member: GuildMember | Snowflake, options?: RequestOptions): Promise<void> {
    const client = Context.getClient()
    const value = member instanceof GuildMember
      ? member.id
      :member

    if (this.ownerId === client.clientUser?.user.id) {
      throw new Error('OWNER_IS_ALREADY_MEMBER')
    }

    const request = new Request(`/guilds/${this.id}`)
    const result = await request.patch({ owner_id: value }, options)

    if (result) {
      this.ownerId = value
      this.owner = this.members.cache.get(value)!
    }
  }

  public async setSplash (path: string, options?: RequestOptions): Promise<void> {
    if (!this.features.includes('INVITE_SPLASH')) {
      Logger.send('error', 'You do not have permission to upload a invitation banner')
    }

    const request = new Request(`/guilds/${this.id}`)
    const filePath = join(process.cwd(), path)
    const file = await fs.promises.readFile(filePath, 'base64')

    const result = await request.patch({ splash: `data:image/png;base64,${file}` }, options)

    if (result) {
      this.splash = result.splash
    }
  }

  public async setDiscoverySplash (path: string, options?: RequestOptions): Promise<void> {
    if (!this.features.includes('DISCOVERABLE')) {
      Logger.send('error', 'You do not have permission to upload a discovery banner')
    }

    const request = new Request(`/guilds/${this.id}`)
    const filePath = join(process.cwd(), path)
    const file = await fs.promises.readFile(filePath, 'base64')

    const result = await request.patch({ discovery_splash: `data:image/png;base64,${file}` }, options)

    if (result) {
      this.splash = result.splash
    }
  }

  public async setBanner (path: string, options?: RequestOptions): Promise<void> {
    if (!this.features.includes('DISCOVERABLE')) {
      Logger.send('error', 'You do not have permission to upload a banner')
    }

    const request = new Request(`/guilds/${this.id}`)
    const filePath = join(process.cwd(), path)
    const file = await fs.promises.readFile(filePath, 'base64')

    const result = await request.patch({ banner: `data:image/png;base64,${file}` }, options)

    if (result) {
      this.banner = result
    }
  }

  public async setSystemChannel (channel: TextChannel | Snowflake, options?: RequestOptions): Promise<void> {
    const request = new Request(`/guilds/${this.id}`)
    const value = channel instanceof TextChannel
      ? channel.id
      :channel

    const result = await request.patch({ system_channel_id: value }, options)

    if (result) {
      this.systemChannelId = result
    }
  }

  public async setSystemChannelFlag (flag: keyof typeof SystemChannelFlag): Promise<void> {
    const request = new Request(`/guilds/${this.id}`)
    const value = SystemChannelFlag[flag]
    const result = await request.patch({ system_channel_flags: value })

    if (result) {
      this.systemChannelFlags = value
    }
  }

  public async setRuleChannel (channel: TextChannel | Snowflake, options?: RequestOptions): Promise<void> {
    const request = new Request(`/guilds/${this.id}`)
    const value = channel instanceof TextChannel
      ? channel.id
      : channel

    const result = await request.patch({ rules_channel_id: value }, options)

    if (result) {
      this.ruleChannelId = value
    }
  }

  public async setPublicUpdateChannel (channel: TextChannel | Snowflake, options?: RequestOptions): Promise<void> {
    const request = new Request(`/guilds/${this.id}`)
    const value = channel instanceof TextChannel
      ? channel.id
      : channel

    const result = await request.patch({ public_updates_channel_id: value }, options)

    if (result) {
      this.publicUpdateChannelId = value
    }
  }

  public async setDescription (value: string, options?: RequestOptions): Promise<void> {
    const request = new Request(`/guilds/${this.id}`)
    const result = await request.patch({ description: value }, options)

    if (result) {
      this.description = value
    }
  }

  public async registerCommands (...commands: Command[]) {
    const client = Context.getClient()
    const request = new Request(`/applications/${client.clientUser!.application.id}/guilds/${this.id}/commands`)

    return Promise.all(
      commands.map(async (command: Command) => {
        const payload = await request.post(command.toJson())

        command.id = payload.id
        command.guild = this

        this.commands.set(command.id!, command)
      })
    )
  }
}