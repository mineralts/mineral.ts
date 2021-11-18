import { Snowflake, BehaviorsExpiration } from '../../types'
import User from './User'
import Account from './Account'
import { DateTime } from 'luxon'
import Application from './Application'

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
    public account: Account,
    public synced_at: DateTime,
    public subscriber_count: number | undefined,
    public isRevoked: boolean | undefined,
    public application: Application,

  ) {
  }
}