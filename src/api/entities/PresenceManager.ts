import Collection from '@discordjs/collection'
import { Snowflake } from '../../types'
import Presence from './Presence'

export default class PresenceManager {
  public cache: Collection<Snowflake, Presence> = new Collection()

  public register (presences: Presence[]) {
    presences.forEach((presence: Presence) => {
      this.cache.set(presence.member.id, presence)
    })
    return this
  }
}