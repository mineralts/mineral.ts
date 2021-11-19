import internal from 'stream';
import { Snowflake } from '../../types'

export default class Overwrite {
  constructor (
    public id: Snowflake,
    public type: 0 | 1,
    public allow: string,
    public deny: string,
  ) {
  }
}