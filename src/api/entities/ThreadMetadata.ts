import { DateTime } from "luxon"
import { Snowflake } from "../../types"

export default class ThreadMetadata {
  constructor (
    public isArchived: boolean,
    public auto_archive_duration: number,
    public archive_timestamp: DateTime,
    public isLocked: boolean,
    public isInvitable: boolean,
  ) {
  }
}