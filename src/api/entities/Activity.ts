import { DateTime } from 'luxon'
import { ActivityAssets, ActivityTimestamps, ActivityType, Snowflake } from '../../types'
import Emoji from './Emoji'

export default class Activity {
  constructor (
    public id: string,
    public type: keyof ActivityType,
    public description: string,
    public name: string,
    public emoji: Emoji | null,
    public timestamps: ActivityTimestamps,
    public state: string | undefined,
    public detail: string | undefined,
    public assets: ActivityAssets,
    public buttons: string[],
    public syncId: string | undefined,
    public sessionId: string | undefined,
    public createdAt: DateTime,
    public applicationId: Snowflake | undefined
  ) {
  }
}