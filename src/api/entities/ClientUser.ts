import User from './User'
import Guild from './Guild'

export default class ClientUser {
  constructor (
    public readonly user: User,
    public readonly sessionId: string,
    public readonly presences: any[],
    public readonly guilds: Guild[],
    public readonly application: { id: string, flags: number }
  ) {
  }
}