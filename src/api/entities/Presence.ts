import GuildMember from './GuildMember'
import Activity from './Activity'

export default class Presence {
  constructor (
    public member: GuildMember,
    public status: string,
    public web: string | null,
    public desktop: string | null,
    public mobile: string | null,
    public activities: Activity[]
  ) {
  }
}