import { DateTime } from 'luxon'
import { ActivityType } from '../../types'

export default class Activity {
  constructor (
    public id: string,
    public type: keyof ActivityType,
    public description: string,
    public name: string,
    /**
     * @todo Add Emoji class
     */
    public emoji: any,
    public createdAt: DateTime,
  ) {
  }
}