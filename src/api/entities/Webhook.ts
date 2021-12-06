import { Snowflake, WebhookType } from '../../types'
import User from './User'
import Guild from './Guild'
import Channel from './channels/Channel'

export default class Webhook {
  constructor(
    public id: Snowflake,
    public type: keyof typeof WebhookType,
    public guildId: Snowflake,
    public channelId: Snowflake,
    public user: User,
    public name: string,
    public avatar: string,
    public token: string,
    public application_id: Snowflake,
    public sourceGuild: Guild,
    public sourceChannel: Channel,
    public url: string
  ) {
  }
}
