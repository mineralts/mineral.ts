import EmbedAuthor from './EmbedAuthor'
import EmbedImage from './EmbedImage'
import EmbedThumbnail from './EmbedThumbnail'
import EmbedVideo from './EmbedVideo'
import EmbedFooter from './EmbedFooter'
import EmbedField from '../../interfaces/EmbedField'
import { resolveColor } from '../../../utils'
import { DateTime } from 'luxon'

export default class MessageEmbed {
  public title: string | undefined
  public description: string | undefined
  public color = 0
  public fields: EmbedField[] = []
  public author: EmbedAuthor | undefined
  public image: EmbedImage | undefined
  public thumbnail: EmbedThumbnail | undefined
  public timestamp: DateTime | undefined
  public video: EmbedVideo | undefined
  public url: string | undefined
  public footer: EmbedFooter | undefined

  public setTitle (value: string) {
    this.title = value
    return this
  }

  public setDescription (value: string) {
    this.description = value
    return this
  }

  public setColor (color: string) {
    this.color = resolveColor(color)
    return this
  }

  public addField (name: string, value: string, inline = false) {
    this.fields.push({ name, value, inline })
    return this
  }

  public setAuthor (options: { name?: string, url?: string | null, icon_url?: string | null, proxy_icon_url?: string}) {
    this.author = new EmbedAuthor(options.name, options.url, options.icon_url)
    return this
  }

  public setImage (options: { url?: string | null, proxy_url?: string }) {
    this.image = new EmbedImage(options.url, options.proxy_url)
    return this
  }

  public setThumbnail (options: { url?: string | null, proxy_url?: string }) {
    this.thumbnail = new EmbedThumbnail(options.url, options.proxy_url)
    return this
  }

  public setTimestamp () {
    this.timestamp = DateTime.now()
    return this
  }

  public setUrl (url: string) {
    this.url = url
    return this
  }

  public setFooter (options: { text: string, iconUrl?: string | null, proxyIconUrl?: string }) {
    this.footer = new EmbedFooter(options.text, options.iconUrl, options.proxyIconUrl)
    return this
  }
}