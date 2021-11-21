import { Snowflake } from '../../types'
import Sticker from './Sticker'

export default class StickerPack {
  constructor (
    public id: Snowflake,
    public stickers: Sticker[],
    public name: string,
    public skuId: Snowflake,
    public coverStickerId: Snowflake,
    public description: string,
    public bannerAssetId: Snowflake,

  ) {
  }
}