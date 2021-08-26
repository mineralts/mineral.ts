import { Snowflake } from '../../types'
import Client from '../../client/Client'

export default interface Guild {
  id?: Snowflake
  name: string
}