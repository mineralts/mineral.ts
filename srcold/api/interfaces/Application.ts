import { Snowflake } from '../../types'

export default interface Application {
  id: Snowflake
  flags: number
}