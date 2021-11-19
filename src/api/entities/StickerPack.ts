import { Snowflake } from '../../types'
import Sticker from './Sticker'

export default class StickerPack {
  constructor (
    public id: Snowflake,
    public stickers: Sticker[],
    public name: string,
    public sku_id: Snowflake,
    public cover_sticker_id: Snowflake,
    public description: string,
    public banner_asset_id: Snowflake,

  ) {
  }
}