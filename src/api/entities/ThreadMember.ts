import { DateTime } from "luxon"
import { Snowflake } from "../../types"

export default class ThreadMember {
  constructor (
    public id: Snowflake,
    public user_id: Snowflake,
    public join_timestamp: DateTime,
    public flags: number,
  ) {
  }
}