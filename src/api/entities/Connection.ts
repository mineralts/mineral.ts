import Integration from './Integration'

export default class Connection {
  constructor (
    public id: string,
    public name: string,
    public type: string,
    public isRevoked: boolean,
    public integrations: Integration[],
    public isVerified: boolean,
    public IsFriendSync: boolean,
    public isShowActivity: boolean,
    public visibility: number,
  ) {
  }
}