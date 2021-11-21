import { Snowflake } from '../../types'

export default class StickerItem {
  constructor (
    public id: Snowflake,
    public name: string,
    public formatType: number,
  ) {
  }
}