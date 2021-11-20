import { Snowflake, BehaviorsExpiration } from '../../types'
import User from './User'
import IntegrationAccount from './IntegrationAccount'
import { DateTime } from 'luxon'
import IntegrationApplication from './IntegrationApplication'

export default class Integration {
  constructor (
    public id: Snowflake,
    public name: string,
    public type: 'twitch' | 'youtube' | 'discord',
    public isEnabled: boolean,
    public isSyncing: boolean,
    public role_id: Snowflake,
    public isEnable_emoticons: boolean,
    public expire_behavior: BehaviorsExpiration,
    public expire_grace_period: number,
    public user: User,
    public account: IntegrationAccount,
    public synced_at: DateTime,
    public subscriber_count: number,
    public isRevoked: boolean,
    public application: IntegrationApplication,

  ) {
  }
}