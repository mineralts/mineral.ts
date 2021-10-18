import { Snowflake } from '../../types'
import BaseClient from './BaseClient'
import Rest from '../../Rest'

export default class User extends BaseClient {
  constructor (
    public readonly id: Snowflake,
    public readonly username: string,
    public readonly discriminator: string,
    public readonly tag: string,
    public readonly isBot: boolean,
    public readonly isVerified: boolean,
    public readonly hasMfaEnabled: boolean,
    public readonly flags: number,
    public readonly email: string | null,
    public readonly avatar: string | null,
    public readonly banner: string | undefined
  ) {
    super()
  }

  public getDefaultAvatarUrl (): string {
    const cdn = Rest.getInstance().cdn
    return `${cdn}/embed/avatars/${this.discriminator}.png`
  }

  public getAvatarUrl (format = 'webp', size?, dynamic = false): string | null {
    const cdn = Rest.getInstance().cdn
    if (dynamic) format = this.avatar?.startsWith('a_') ? 'gif' : format
    return this.avatar
      ? this.makeImageUrl(`${cdn}/avatars/${this.id}/${this.avatar}`, { format, size })
      : null
  }

  public async getBannerUrl (format = 'webp', size?, dynamic = false): Promise<string | null> {
    const cdn = Rest.getInstance().cdn
    if (dynamic) format = this.avatar?.startsWith('a_') ? 'gif' : format
    return this.avatar
      ? this.makeImageUrl(`${cdn}/banners/${this.id}/${this.banner}`, { format, size })
      : null
  }

  protected makeImageUrl (root, { format = 'webp', size = 256 }: { format?: any; size?: any } = {}) {
    return `${root}.${format}${size ? `?size=${size}` : ''}`;
  }
}