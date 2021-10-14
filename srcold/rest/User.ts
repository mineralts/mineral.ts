import Client from '../client/Client'
import { Snowflake } from '../types'

export default class User {
  constructor (private client: Client) {
  }

  public getDefaultAvatar (discriminator: number) {
    return `${this.client.cdnUrl}/embed/avatars/${discriminator}.png`
  }

  public getAvatar (userId: Snowflake, image: string, format = 'webp', size, dynamic = false) {
    if (dynamic) format = image.startsWith('a_') ? 'gif' : format;
    return this.makeImageUrl(`${this.client.cdnUrl}/avatars/${userId}/${image}`, { format, size });
  }

  private makeImageUrl(root, { format = 'webp', size = 256 } = {}) {
    return `${root}.${format}${size ? `?size=${size}` : ''}`;
  }
}