import User from './User'

export default class Application {
  constructor (
    public id: string,
    public name: string,
    public icon: string | null,
    public description: string,
    public summary: string,
    public bot: User,

  ) {
  }
}