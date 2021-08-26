import { NumericChannelInstance, Snowflake } from '../../../types'
import Channel from '../Channel'

export default class CategoryChannel extends Channel {
  constructor (
    id: Snowflake,
    type: NumericChannelInstance,
    name: string,
    public position: number | null = null,
    public permissionOverwrites: any = []
  ) {
    super(id, type, name)
  }
}