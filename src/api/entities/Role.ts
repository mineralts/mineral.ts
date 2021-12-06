import { Snowflake } from '../../types'
import Guild from './Guild'
import Logger from '@leadcodedev/logger'

export default class Role {
  constructor(
    public id: Snowflake,
    public name: string,
    public unicodeEmoji: string | null,
    public position: number,
    public permissions: string,
    public mentionable: boolean,
    public managed: boolean,
    public icon: any,
    public hoist: boolean,
    public color: number,
    public guild: Guild
  ) {
  }

  public async comparePositions(firstRole, lastRole) {
    if (firstRole.position === lastRole.position) {
      return lastRole - firstRole.id
    }
    return firstRole.position - lastRole.position
  }

  public async comparePositionTo(role) {
    role = this.guild.roles.cache.get(role)
    if (!role) {
      Logger.send('error', 'Role nor a Snowflake')
    }
    return this.comparePositions(this, role)
  }
}
