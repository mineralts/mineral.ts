import { Snowflake } from '../../types'
import Guild from './Guild';

export default class Role {
  constructor (
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
}
