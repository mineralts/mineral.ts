import { Snowflake } from '../../types'
import VoiceChannel from './channels/VoiceChannel'

export default class VoiceState {
  constructor (
    public sessionId: string,
    public suppress: boolean,
    public hasVideo: boolean,
    public isMute: boolean,
    public isDeaf: boolean,
    public channelId: Snowflake,
    public channel: VoiceChannel | undefined
  ) {
  }
}