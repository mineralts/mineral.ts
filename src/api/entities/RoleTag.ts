import { Snowflake } from '../../types'
import Client from '../../client/Client'

export default class RoleTag {
  constructor (
    public bot: Client,
    public integrationId: Snowflake,
    public premiumSubscriber: null,
  ) {
  }
}