import ClientUser from '../api/entities/ClientUser'
import Guild from '../api/entities/Guild'
import TextChannel from '../api/entities/channels/TextChannel'
import VoiceChannel from '../api/entities/channels/VoiceChannel'
import RateLimit from '../api/entities/RateLimit'
import Message from '../api/entities/Message'
import Emoji from '../api/entities/Emoji'
import Reaction from '../api/entities/Reaction'
import Presence from '../api/entities/Presence'
import GuildMember from '../api/entities/GuildMember'
import CategoryChannel from '../api/entities/channels/CategoryChannel'
import StringArgument from '../api/components/commands/StringArgument'
import NumberArgument from '../api/components/commands/NumberArgument'
import ChoiceArgument from '../api/components/commands/ChoiceArgument'
import Button from '../api/components/buttons/Button'
import ButtonLink from '../api/components/buttons/ButtonLink'
import SelectMenu from '../api/components/selectMenus/SelectMenu'
import ButtonInteraction from '../api/entities/interactions/ButtonInteraction'
import SelectMenuInteraction from '../api/entities/interactions/SelectMenuInteraction'
import CommandInteraction from '../api/entities/interactions/CommandInteraction'
import Invite from '../api/entities/Invite'

export type Snowflake = string
export type Milliseconds = number

export enum Intent {
  GUILDS = 1,
  GUILD_MEMBERS = 2,
  GUILD_BANS = 4,
  GUILD_EMOJIS_AND_STICKERS = 8,
  GUILD_INTEGRATIONS = 16,
  GUILD_WEBHOOKS = 32,
  GUILD_INVITES = 64,
  GUILD_VOICE_STATES = 128,
  GUILD_PRESENCES = 256,
  GUILD_MESSAGES = 512,
  GUILD_MESSAGE_REACTIONS = 1024,
  GUILD_MESSAGE_TYPING = 2048,
  DIRECT_MESSAGES = 4096,
  DIRECT_MESSAGE_REACTIONS = 8192,
  DIRECT_MESSAGE_TYPING = 16384,
  ALL = 32767,
}

export default interface ClientOptionContext {
  shardCount?: 1
  messageCacheLifetime?: 0
  messageSweepInterval?: 0
  invalidRequestWarningInterval?: 0
  intents?: 'ALL' | Exclude<keyof typeof Intent, 'ALL'>[],
  restWsBridgeTimeout?: 5000
  restRequestTimeout?: 15000
  restGlobalRateLimit?: 0
  retryLimit?: 1
  restTimeOffset?: 500
  restSweepInterval?: 60
  failIfNotExists?: true
  userAgentSuffix?: []
}

export type ShardingMode = 'process' | 'worker'

export type ShardOption = {
  totalShards: 'auto' | number,
  mode: ShardingMode,
  respawn: boolean,
  shardArgs: string[],
  execArgv: any[],
  token: string,
}

export enum Opcode {
  DISPATCH_EVENT = 0,
  HEARTBEAT = 1,
  IDENTIFY = 2,
  PRESENCE_UPDATE = 3,
  VOICE_STATE_UPDATE = 4,
  RESUME = 6,
  RECONNECT = 7,
  REQUEST_GUILD_MEMBER = 8,
  INVALID_SESSION = 9,
  HELLO = 10,
  HEARTBEAT_ACK = 11,
}

export type Awaited<T> = T | PromiseLike<T>

export interface MineralVein {
  ready: [client: ClientUser]
  guildCreate: [guild: Guild]
  messageCreate: [message: Message]
  messageUpdate: [before: Message | undefined, after: Message]
  messageDelete: [message: Message]
  channelCreate: [channel: ChannelResolvable]
  channelDelete: [channel: ChannelResolvable]
  channelUpdate: [before: ChannelResolvable, after: ChannelResolvable]
  rateLimit: [rateLimit: RateLimit]
  messageReactionAdd: [message: Message, reaction: Reaction]
  messageReactionRemove: [message: Message, reaction: Reaction]
  presenceUpdate: [before: Presence | undefined, after: Presence]
  voiceJoin: [member: GuildMember]
  memberBoostAdd: [member: GuildMember]
  memberBoostRemove: [member: GuildMember]
  interactionButtonCreate: [interaction: ButtonInteraction]
  [key: `interactionButton::${string}`]: [interaction: ButtonInteraction]
  interactionSelectMenuCreate: [interaction: SelectMenuInteraction]
  [key: `interactionSelectMenu::${string}`]: [interaction: SelectMenuInteraction]
  interactionCommandCreate: [interaction: CommandInteraction]
  [key: `interactionCommand::${string}`]: [interaction: CommandInteraction]
  rulesAccept: [member: GuildMember]
  guildMemberJoin: [member: GuildMember, invitation?: Invite]
  guildMemberLeave: [member: GuildMember]
}

export type MineralEvent = `buttonInteraction::${string}`

export enum ChannelTypeResolvable {
  GUILD_TEXT = 0,
  DM = 1,
  GUILD_VOICE = 2,
  GROUP_DM = 3,
  GUILD_CATEGORY = 4,
  GUILD_NEWS = 5,
  GUILD_STORE = 6,
  GUILD_NEWS_THREAD = 10,
  GUILD_PUBLIC_THREAD = 11,
  GUILD_PRIVATE_THREAD = 12,
  GUILD_STAGE_VOICE = 13,
}

export type ChannelResolvable = TextChannel | VoiceChannel | CategoryChannel

export enum Region {
  FRANCE = 'fr',
  ENGLAND = 'en_US',
  SPAIN = 'es-ES',
  GERMANY = 'de',
  DENMARK = 'da',
  CROATIA = 'hr',
  ITALY = 'it',
  LITHUANIA = 'lt',
  HUNGARY = 'hu',
}

export enum ActivityType {
  'PLAYING',
  'LISTENING',
  'STREAMING',
  'WATCHING',
  'CUSTOM',
  'COMPETING'
}

export enum VerificationType {
  NONE,
  LOW,
  MEDIUM,
  HIGH,
  VERY_HIGH,
}

export enum NotificationLevel {
  ALL_MESSAGES,
  ONLY_MENTIONS
}

export enum ExplicitContentLevel {
  DISABLED,
  MEMBERS_WITHOUT_ROLES,
  ALL_MEMBERS,
}

export enum BehaviorsExpiration {
  REMOVE_ROLE,
  KICK
}

export type GuildFeature =
  | 'ANIMATED_ICON'
  | 'BANNER'
  | 'COMMERCE'
  | 'COMMUNITY'
  | 'DISCOVERABLE'
  | 'FEATURABLE'
  | 'INVITE_SPLASH'
  | 'MEMBER_VERIFICATION_GATE_ENABLED'
  | 'MONETIZATION_ENABLED'
  | 'MORE_STICKERS'
  | 'NEWS'
  | 'PARTNERED'
  | 'PREVIEW_ENABLED'
  | 'PRIVATE_THREADS'
  | 'ROLE_ICONS'
  | 'SEVEN_DAY_THREAD_ARCHIVE'
  | 'THREE_DAY_THREAD_ARCHIVE'
  | 'TICKETED_EVENTS_ENABLED'
  | 'VANITY_URL'
  | 'VERIFIED'
  | 'VIP_REGIONS'
  | 'WELCOME_SCREEN_ENABLED'

export enum SystemChannelFlag {
  SUPPRESS_JOIN_NOTIFICATIONS	= 1 << 0,
  SUPPRESS_PREMIUM_SUBSCRIPTIONS =	1 << 1,
  SUPPRESS_GUILD_REMINDER_NOTIFICATIONS = 1 << 2,
}

export enum Feature {
  ANIMATED_ICON,
  BANNER,
  COMMERCE,
  COMMUNITY,
  DISCOVERABLE,
  FEATURABLE,
  INVITE_SPLASH,
  MEMBER_VERIFICATION_GATE_ENABLED,
  MONETIZATION_ENABLED,
  MORE_STICKERS,
  NEWS,
  PARTNERED,
  PREVIEW_ENABLED,
  PRIVATE_THREADS,
  ROLE_ICONS,
  SEVEN_DAY_THREAD_ARCHIVE,
  THREE_DAY_THREAD_ARCHIVE,
  TICKETED_EVENTS_ENABLED,
  VANITY_URL,
  VERIFIED,
  VIP_REGIONS,
  WELCOME_SCREEN_ENABLED,
}

export type LocalPath = string
export type Url = string

export type RequestOptions = {
  retryOnRateLimit: boolean
}

export type MessageCollectorOption = {
  maxMessage?: number
  duration?: number
}

export enum ComponentType {
  ACTION_ROW = 1,
  BUTTON = 2,
  SELECT_MENU = 3,
}

export enum ButtonStyle {
  PRIMARY =	1,
  SECONDARY = 2,
  SUCCESS	= 3,
  DANGER = 4,
  LINK = 5,
}

export type MenuSelect = {
  customId:	string
  placeholder?: string
  minValues?: number
  maxValues?: number
  disabled?:	boolean
  choices: MenuSelectOption[]
}

export type MenuSelectOption = {
  label: string
  value: unknown
  description?: string
  emoji?: string | Emoji
  default?: boolean
}

export enum PresenceStatus {
  INACTIVE = 'idle',
  DO_NOT_DISTURB = 'dnd',
  ONLINE = 'online',
  OFFLINE = 'offline',
}

export enum VerificationLevel {
  NONE,
  LOW,
  MEDIUM,
  HIGH,
  VERY_HIGH,
}

type ChannelNode<Type extends keyof ChannelOptions> = {
  name: string
  type: Type
  permissionOverwrites?: any[]
  position?: number
  options?: Type extends keyof ChannelOptions
    ? ChannelOptions[Type]
    : never
}

type ChannelOptions = {
  GUILD_TEXT: {
    nsfw?: boolean
    cooldown?: number
    topic?: string
    parentId?: Snowflake
    parent?: CategoryChannel
  },
  GUILD_VOICE: {
    userLimit?: number
    bitrate?: number
    parentId?: Snowflake
    parent?: CategoryChannel
  },
  GUILD_CATEGORY: never
}

export type ChannelOptionResolvable = ChannelNode<'GUILD_TEXT'>
  | ChannelNode<'GUILD_VOICE'>
  | ChannelNode<'GUILD_CATEGORY'>

export enum CommandType {
  CHAT_INPUT = 1,
  USER = 2,
  MESSAGE = 3,
}

export enum CommandArgumentType {
  SUB_COMMAND = 1,
  SUB_COMMAND_GROUP	= 2,
  STRING	= 3,
  INTEGER	= 4,
  BOOLEAN	= 5,
  USER	= 6,
  CHANNEL =	7,
  ROLE =	8,
  MENTIONABLE	= 9,
  NUMBER = 10,
}

export type ChoiceOption = {
  name: string
  emoji?: string | undefined
  value: string | number | boolean
}

export type CommandParamsResolvable = StringArgument | NumberArgument | ChoiceArgument

export type MessageComponentResolvable = Button | ButtonLink | SelectMenu

export enum InteractionType {
  PING = 1,
  APPLICATION_COMMAND = 2,
  MESSAGE_COMPONENT = 3,
}

export enum InteractionType {
  PONG = 1,
  CHANNEL_MESSAGE_WITH_SOURCE =	4,
  DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE = 5,
  DEFERRED_UPDATE_MESSAGE = 6,
  UPDATE_MESSAGE =	7,
  APPLICATION_COMMAND_AUTOCOMPLETE_RESULT = 8,
}
