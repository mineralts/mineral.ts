import MessageOption from './MessageOption'

export default interface InteractionMessageOptions extends MessageOption {
  ephemeral?: boolean
}