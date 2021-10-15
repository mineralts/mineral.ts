import { Snowflake } from '../../types'
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
    const request = new Request(`/guilds/${this.id}`).patch({
      name: value,
    })
  }
}