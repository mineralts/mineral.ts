import { Snowflake } from '../../types'

export default class Role {
  constructor (
    public id: Snowflake,
    public name: string,
    public color: number,
    public hoist: boolean,
    public position: number,
    public permissions: string,
    public managed: boolean,
    public isMentionable: boolean,
    public tags?: string
  ) {
  }
}