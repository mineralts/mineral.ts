import { Snowflake } from '../../types'
import CachedRoles from './CachedRoles'
import User from './User'

export default class Member {
  constructor (
    public user: User,
    public roles: CachedRoles
  ) {
  }
}