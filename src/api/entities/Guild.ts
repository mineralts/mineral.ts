import { ExplicitContentLevel, Milliseconds, NotificationLevel, Region, Snowflake } from '../../types'
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
    public features: string[],
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
    public embeddedActivities: any[],
  ) {
  }

  public async setName (value: string) {
    const request = new Request(`/guilds/${this.id}`)
    await request.patch({ name: value })
  }

  public async setRegion(region: keyof typeof Region) {
    const request = new Request(`/guilds/${this.id}`)
    await request.patch({ preferred_locale: region })
  }

  public async leave () {
    const client = Context.getClient()
    if (this.ownerId === client.clientUser?.user.id) {
      throw new Error('GUILD_OWNER')
    }
    const request = new Request(`/guilds/${this.id}`)
    await request.delete()
    client.cacheManager.guilds.cache.delete(this.id)
  }
  public async setAfkChannel (voiceChannel: Snowflake)
  public async setAfkChannel (voiceChannel: VoiceChannel)
  public async setAfkChannel (voiceChannel: VoiceChannel | Snowflake) {
    const request = new Request(`/guilds/${this.id}`)
    return request.patch({
      afk_channel_id: voiceChannel instanceof VoiceChannel
        ? voiceChannel.id
        :voiceChannel
    })
  }

  public async setVerificationLevel (level: keyof typeof VerificationLevel) {
    const request = new Request(`/guilds/${this.id}`)
    await request.patch({
      verification_level: VerificationLevel[level]
    })
  }

  public async setNotificationLevel (level: keyof typeof NotificationLevel) {
    const request = new Request(`/guilds/${this.id}`)
    await request.patch({
      default_message_notifications: NotificationLevel[level]
    })
  }

  public async setExplicitContentFilter (level: keyof typeof ExplicitContentLevel) {
    const request = new Request(`/guilds/${this.id}`)
    await request.patch({
      explicit_content_filter: ExplicitContentLevel[level]
    })
  }

  public async setAfkTimeout (value: Milliseconds) {
    const request = new Request(`/guilds/${this.id}`)
    await request.patch({
      afk_timeout: ExplicitContentLevel[value]
    })
  }

  public async setIcon (path: string) {
    const request = new Request(`/guilds/${this.id}`)
    const filePath = join(process.cwd(), path)
    const file = await fs.promises.readFile(filePath, 'base64')

    await request.patch({ icon: `data:image/png;base64,${file}` })
  }

  public async setOwner (id: Snowflake)
  public async setOwner (member: GuildMember)
  public async setOwner (member: GuildMember | Snowflake) {
    const client = Context.getClient()

    if (this.ownerId === client.clientUser?.user.id) {
      throw new Error('OWNER_IS_ALREADY_MEMBER')
    }

    const request = new Request(`/guilds/${this.id}`)

    if (member instanceof GuildMember) {
      await request.patch({ owner_id: member.id })
    } else {
      await request.patch({ owner_id: member })
    }
  }

  public async setSplash (path: string) {
    const request = new Request(`/guilds/${this.id}`)
    const filePath = join(process.cwd(), path)
    const file = await fs.promises.readFile(filePath, 'base64')

    await request.patch({ splash: `data:image/png;base64,${file}` })
  }

  public async setDiscoverySplash (path: string) {
    const request = new Request(`/guilds/${this.id}`)
    const filePath = join(process.cwd(), path)
    const file = await fs.promises.readFile(filePath, 'base64')

    await request.patch({ discovery_splash: `data:image/png;base64,${file}` })
  }
}