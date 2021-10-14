import Collection from '@discordjs/collection'
import { Snowflake } from '../../types'

export default interface Cache<Entity> {
  cache: Collection<Snowflake, Entity>
}