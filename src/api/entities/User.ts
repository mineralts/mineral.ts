import { Snowflake } from '../../types'

export default class User {
  constructor (
    public id: Snowflake,
    public username: string,
    public avatar: string | null,
    public defaultAvatar: string | null,
    public email: string | null,
    public flags: number,
    public isVerified: boolean,
    public discriminator: string,
    public hasMfaEnabled: boolean,
    public isBot: boolean,
  ) {
  }
}