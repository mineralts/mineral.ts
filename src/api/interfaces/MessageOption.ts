import MessageEmbed from '../components/embeds/MessageEmbed'
import EmbedRow from '../components/embeds/EmbedRow'

export default interface MessageOption {
  content?: string,
  embeds?: MessageEmbed[],
  tts?: boolean,
  components?: EmbedRow[]
}