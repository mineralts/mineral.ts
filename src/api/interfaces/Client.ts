import User from './User'
import Collection from '@discordjs/collection'
import { Snowflake } from '../../types'
import Guild from './Guild'
import Application from './Application'

export default interface Client {
  user: User,
  guilds: Snowflake[]
  application: Application
}