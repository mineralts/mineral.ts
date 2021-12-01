import User from './User'
import Command from '../components/commands/Command'
import Request from '../../sockets/Request'
import Presence from './Presence'
import { ActivityOption, ActivityType, Opcode, PresenceData, Snowflake } from '../../types'
import Collection from '../../Collection'
import Context from '../../Context'
import { DateTime } from 'luxon'
import Logger from '@leadcodedev/logger'

export default class ClientUser {
  constructor (
    public readonly user: User,
    public readonly sessionId: string,
    public readonly presences: Presence[],
    public readonly application: { id: string, flags: number },
    public commands: Collection<Snowflake, Command> = new Collection()
  ) {
  }

  public async setPresence (presence: PresenceData) {
    const socketManager = Context.getClient().socket.socketManager
    const request = socketManager.request(Opcode.PRESENCE_UPDATE, {
      since: presence.status === 'DO_NOT_DISTURB' ? DateTime.now().toMillis() : null,
      status: presence.status || null,
      afk: presence.afk !== undefined ? presence.afk : null,
      activities: presence.activities?.length ? presence.activities.map((activity: ActivityOption) => {
        if (activity.type === 'STREAMING' && !activity.url) {
          Logger.send('warn', 'Please define a URL to stream to display the presence')
        }

        return { ...activity, type: ActivityType[activity.type] }
      }) : []
    })

    socketManager.websocket.send(request)
  }

  public async registerCommands (...commands: Command[]) {
    const request = new Request(`/applications/${this.application.id}`)

    return Promise.all(
      commands.map(async (command: Command) => {
        const payload = await request.post(command)
        command.id = payload.id

        this.commands.set(command.id!, command)
      })
    )
  }
}