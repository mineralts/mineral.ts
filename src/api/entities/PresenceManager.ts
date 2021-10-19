import Collection from '@discordjs/collection'
import { Snowflake } from '../../types'
import Presence from './Presence'

export default class PresenceManager {
  public cache: Collection<Snowflake, Presence> = new Collection()

  public register (presences: Collection<Snowflake, Presence>) {
    this.cache = presences
    return this
  }
}