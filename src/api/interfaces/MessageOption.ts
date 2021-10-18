import MessageEmbed from '../components/embeds/MessageEmbed'
import EmbedRow from '../components/embeds/EmbedRow'
import MessageAttachment from '../entities/MessageAttachment'

export default interface MessageOption {
  content?: string
  embeds?: MessageEmbed[]
  tts?: boolean
  components?: EmbedRow[]
  attachment?: MessageAttachment
}