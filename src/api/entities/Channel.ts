import { NumericChannelInstance, Snowflake } from '../../types'

export default class Channel {
  constructor (
    public id: Snowflake,
    public type: NumericChannelInstance,
    public name: string,
    // public readonly createdAt: Date
    // public readonly createdTimestamp: number
  ) {}

  public async delete (reason?: string): Promise<Channel> {
    return this
  }

  public async fetch (force: boolean): Promise<Channel> {
    return this
  }

  public isText (): boolean {
    return false;
  }

  public isThread (): boolean {
    return false;
  }

  public isVoice (): boolean {
    return false;
  }
}