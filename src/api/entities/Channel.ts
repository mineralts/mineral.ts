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
    public guild_id: Snowflake,
    public position: number,
    public permission_overwrites: Overwrite[],
    public name: string,
    public topic: string | undefined,
    public isNsfw: boolean,
    public last_message_id: Snowflake | undefined,
    public bitrate: number,
    public user_limit: number,
    public rate_limit_per_user: number,
    public recipients: User[],
    public icon: string | undefined,
    public owner_id: Snowflake,
    public application_id: Snowflake,
    public parent_id: Snowflake | undefined,
    public last_pin_timestamp: DateTime | undefined,
    public rtc_region: string | undefined,
    public video_quality_mode: number,
    public message_count: number,
    public member_count: number,
    public thread_metadata: ThreadMetadata,
    public member: ThreadMember,
    public default_auto_archive_duration: number,
    public permissions: string,
  ) {
  }
}