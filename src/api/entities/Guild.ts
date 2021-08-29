import { Snowflake } from '../../types'
import Collection from '@discordjs/collection'
import Channel from './Channel'
import VoiceState from './VoiceState'
import Member from './Member'
import Emoji from './Emoji'
import Role from './Role'

export default class Guild {
  constructor (
    public id: Snowflake,
    public icon: string | null,
    public name: string,
    public description: string,
    public banner: any,
    public memberCount: number,
    public owner: Member,
    public members: Collection<Snowflake, Member>,
    public channels: Collection<Snowflake, Channel>,
    public emojis: Collection<Snowflake, Emoji>,
    public role: Collection<Snowflake, Role>,
    public verificationLevel: number,
    public premiumTier: number,
    public premiumSubscriptionCount: number,
    public explicitContentFilter: number,
    public maxVideoChannelUsers: number,
    public splash: any,
    public stickers: any[],
    public unavailable: boolean,
    public voiceState: VoiceState[],
    public region: string,
    public ruleChannel: Channel | undefined
  ) {}
}