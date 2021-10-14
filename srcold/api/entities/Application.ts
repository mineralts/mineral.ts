import { Snowflake } from '../../types'

export default class Application {
  constructor (
    public id: Snowflake,
    public flags: number,
    apiVersion: number,
  ) {
  }
}