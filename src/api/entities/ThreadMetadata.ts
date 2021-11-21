import { DateTime } from "luxon"
export default class ThreadMetadata {
  constructor (
    public isArchived: boolean,
    public autoArchiveDuration: number,
    public archiveTimestamp: DateTime,
    public isLocked: boolean,
    public isInvitable: boolean,
  ) {
  }
}