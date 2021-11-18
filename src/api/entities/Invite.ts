import GuildMember from './GuildMember'
import { ChannelResolvable } from '../../types'
import { DateTime } from 'luxon'

export default class Invite {
  constructor (
    public owner: GuildMember,
    public channel: ChannelResolvable,
    public code: string,
    public count: number,
    public max: number,
    public isTemporary: boolean,
    public expireAt: DateTime,
    public createdAt: DateTime,
  ) {
  }
}