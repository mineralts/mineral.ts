import MessageEmbed from '../components/MessageEmbed'

export default interface MessageOption {
  content?: unknown,
  embeds?: MessageEmbed[],
  tts?: boolean,
  components?: any[]
}