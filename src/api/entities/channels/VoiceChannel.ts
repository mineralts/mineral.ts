import Channel from './Channel'
import { Snowflake } from '../../../types'
import { CategoryChannel } from './CategoryChannel'

export default class VoiceChannel extends Channel {
  constructor (
    id: Snowflake,
    public name: string,
    public userLimit: number,
    public region: null,
    public rateLimitPerUser: number,
    public position: number,
    public permission: any[],
    public parentId: Snowflake,
    public bitrate: number,
    public parent?: CategoryChannel,
  ) {
    super(id, 'GUILD_VOICE')
  }
}