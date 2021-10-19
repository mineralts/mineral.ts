import GuildMember from './GuildMember'
import Activity from './Activity'
import { PresenceStatus } from '../../types'

export default class Presence {
  constructor (
    public member: GuildMember,
    public status: keyof typeof PresenceStatus,
    public web: string | null,
    public desktop: string | null,
    public mobile: string | null,
    public activities: Activity[]
  ) {
  }
}