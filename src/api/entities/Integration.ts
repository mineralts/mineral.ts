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
    public roleId: Snowflake,
    public isEnableEmoticons: boolean,
    public expireBehavior: BehaviorsExpiration,
    public expireGracePeriod: number,
    public user: User,
    public account: IntegrationAccount,
    public syncedAt: DateTime,
    public subscriberCount: number,
    public isRevoked: boolean,
    public application: IntegrationApplication,

  ) {
  }
}