import BasePacket from './BasePacket'
import Client from '../client/Client'
import ThreadChannel from '../api/entities/channels/ThreadChannel'
import Guild from '../api/entities/Guild'

export default class GuildCreatePacket implements BasePacket {
  public packetType: string = 'GUILD_CREATE'

  public async handle (client: Client, payload: any): Promise<void> {
    const channels = client.channelManager.insertIntoCache(payload)
    const roles = client.roleManager.insertIntoCache(payload.roles)
    const emojis = client.emojiManager.insertIntoCache(payload.emojis)
    const members = client.memberManager.insertIntoCache(payload.members)

    payload.threads.forEach((channel: any) => {
      client.cacheManager.channels.set(channel.id, new ThreadChannel(
        payload.id,
        payload.type,
        payload.name,
        payload.thread_metadata,
        payload.rate_limit_per_user,
        payload.owner_id,
        payload.message_count,
        payload.member_count,
        payload.last_message_id,
        payload.guild_id,
      ))
    })

    const guild = new Guild(
      payload.id,
      payload.icon,
      payload.name,
      payload.description,
      payload.banner,
      payload.member_count,
      members.get(payload.owner_id)!,
      client.cacheManager.members,
      channels,
      emojis,
      roles,
      payload.verification_level,
      payload.premium_tier,
      payload.premium_subscription_count,
      payload.explicit_content_filter,
      payload.max_video_channel_users,
      payload.splash,
      payload.stickers,
      payload.unavailable,
      payload.voice_states,
      payload.region,
      client.cacheManager.channels.get(payload.rule_channel_id),
    )
    console.log(members, payload.owner_id, members.get(payload.owner_id))

    client.cacheManager.guilds.set(payload.id, guild)

    client.emit('guildCreate', guild)
  }
}