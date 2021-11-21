export default class VoiceRegion {
  constructor (
    public id: string,
    public name: string,
    public isOptimal: boolean,
    public isDeprecated: boolean,
    public isCustom: boolean,
  ) {
  }
}