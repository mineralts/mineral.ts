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
    public isSyncing: boolean | undefined,
    public role_id: Snowflake | undefined,
    public isEnable_emoticons: boolean | undefined,
    public expire_behavior: BehaviorsExpiration | undefined,
    public expire_grace_period: number | undefined,
    public user: User | undefined,
    public account: IntegrationAccount,
    public synced_at: DateTime,
    public subscriber_count: number | undefined,
    public isRevoked: boolean | undefined,
    public application: IntegrationApplication | undefined,

  ) {
  }
}