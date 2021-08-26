import Channel from '../Channel'
import { NumericChannelInstance, Snowflake } from '../../../types'

export default class VoiceChannel extends Channel {
  constructor (
    id: Snowflake,
    type: NumericChannelInstance,
    name: string,
    public position: number,
    public permissionOverwrites: any[] = [],
    public parentId: Snowflake | null = null,
    public rtcRegion: string,
    public bitrate: number,
  ) {
    super(id, type, name)
  }
}