import MineralClient from '../clients/MineralClient'
import GuildCache from './GuildCache'

export default class CacheManager {
  public guilds: GuildCache = new GuildCache(this)

  constructor (public client: MineralClient) {
  }
}