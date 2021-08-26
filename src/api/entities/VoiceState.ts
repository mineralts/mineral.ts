import Guild from './Guild'
import Channel from './Channel'
import { Snowflake } from '../../types'

export default class VoiceState {
  constructor (
    public guild: Guild | undefined,
    public channel: Channel | undefined,
    public member: any,
    public sessionId: Snowflake,
    public isDeaf: boolean,
    public isMute: boolean,
    public isSelfDeaf: boolean,
    public isSelfMute: boolean,
    public isSelfStream: boolean,
    public isSelfVideo: boolean,
    public isSuppress: boolean,
  ) {
  }
}