import CachedRoles from './CachedRoles'
import User from './User'
import Guild from './Guild'
import { Snowflake } from '../../types'
import VoiceChannel from './channels/VoiceChannel'

export default class GuildMember {
  constructor (
    public user: User,
    public roles: CachedRoles,
    public guild: Guild | null,
    public sessionId: Snowflake | null = null,
    public isDeaf: boolean,
    public isMute: boolean,
    public isSelfDeaf: boolean = false,
    public isSelfMute: boolean = false,
    public isSelfStream: boolean = false,
    public isSelfVideo: boolean = false,
    public isSuppress: boolean = false,
    public voiceChannel: VoiceChannel | null = null
  ) {
  }

  public _patch (data: { [k in keyof GuildMember]?: any }) {
    Object.entries(data).forEach(([key, value]) => {
      this[key] = value
    })
  }

  public clone () {
    return new GuildMember(
      this.user,
      this.roles,
      this.guild,
      this.sessionId,
      this.isDeaf,
      this.isMute,
      this.isSelfDeaf,
      this.isSelfMute,
      this.isSelfStream,
      this.isSelfVideo,
      this.isSuppress,
      this.voiceChannel,
    )
  }
}