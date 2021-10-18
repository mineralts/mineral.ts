import MessageEmbed from '../components/embeds/MessageEmbed'
import Row from '../components/Row'

export default interface MessageOption {
  content?: string,
  embeds?: MessageEmbed[],
  tts?: boolean,
  components?: Row[]
}