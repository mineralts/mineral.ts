import { Snowflake } from '../../types'
import Role from './Role'

export default class Emoji {
  constructor (
    public id: Snowflake | null = null,
    public name: string,
    public roles: Role[],
    public isRequireColons: boolean = false,
    public isManaged: boolean = false,
    public isAnimated: boolean = false,
    public isAvailable: boolean = false,
  ) {
  }

  public toString () {
    return this.id
      ? `<${this.isAnimated ? 'a' : ''}:${this.name}:${this.id}>`
      : this.name
  }
}