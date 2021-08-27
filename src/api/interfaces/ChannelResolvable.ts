import TextChannel from './channels/TextChannel'
import CategoryChannel from '../entities/channels/CategoryChannel'
import StageChannel from '../entities/channels/StageChannel'
import VoiceChannel from '../entities/channels/VoiceChannel'
import NewsChannel from '../entities/channels/NewsChannel'

export type ChannelResolvable = TextChannel | CategoryChannel | StageChannel | VoiceChannel | NewsChannel