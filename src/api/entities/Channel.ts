import { DateTime } from 'luxon'
import { Snowflake } from '../../types'
import Overwrite from './Overwrite'
import User from './User'
import ThreadMember from './ThreadMember'
import ThreadMetadata from './ThreadMetadata'

export default class Channel {
  constructor (
    public id: Snowflake,
    public type: number,
    public guild_id: Snowflake | undefined,
    public position: number | undefined,
    public permission_overwrites: Overwrite[] | undefined,
    public name: string | undefined,
    public topic: string | undefined,
    public isNsfw: boolean | undefined,
    public last_message_id: Snowflake | undefined,
    public bitrate: number | undefined,
    public user_limit: number | undefined,
    public rate_limit_per_user: number | undefined,
    public recipients: User[] | undefined,
    public icon: string | undefined,
    public owner_id: Snowflake | undefined,
    public application_id: Snowflake | undefined,
    public parent_id: Snowflake | undefined,
    public last_pin_timestamp: DateTime | undefined,
    public rtc_region: string | undefined,
    public video_quality_mode: number | undefined,
    public message_count: number | undefined,
    public member_count: number | undefined,
    public thread_metadata: ThreadMetadata | undefined,
    public member: ThreadMember | undefined,
    public default_auto_archive_duration: number | undefined,
    public permissions: string | undefined,
  ) {
  }
}