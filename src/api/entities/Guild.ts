import { Region, Snowflake } from '../../types'
import GuildHashes from './GuildHashes'
import GuildStickerManager from './GuildStickerManager'
import GuildPresenceManager from './GuildPresenceManager'
import GuildThreadManager from './GuildThreadManager'
import GuildEmojiManager from './GuildEmojiManager'
import GuildRoleManager from './GuildRoleManager'
import GuildMemberManager from './GuildMemberManager'
import GuildChannelManager from './GuildChannelManager'
import GuildMember from './GuildMember'
import Request from '../../sockets/Request'
import Context from '../../Context'
import VoiceChannel from './VoiceChannel'

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
    public presences: GuildPresenceManager,
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

  public async setRegion(region: Region) {
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
}