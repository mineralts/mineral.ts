import Collection from '../../Collection'
import Invite from './Invite'

export default class InviteManager {
  public cache: Collection<string, Invite> = new Collection()
}
