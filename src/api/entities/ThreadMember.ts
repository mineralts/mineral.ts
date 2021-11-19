import { DateTime } from "luxon"
import { Snowflake } from "../../types"

export default class ThreadMember {
  constructor (
    public id: Snowflake | undefined,
    public user_id: Snowflake | undefined,
    public join_timestamp: DateTime,
    public flags: number,
  ) {
  }
}