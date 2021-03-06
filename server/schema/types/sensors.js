export default `
type Sensors implements SystemInterface{
  id: ID
  simulatorId: ID
  type: String
  name: String
  displayName: String
  stealthFactor: Float
  domain: String
  pings: Boolean
  timeSincePing: Int
  pingMode: PING_MODES
  scanResults: String
  scanRequest: String
  processedData: String
  presetAnswers: [PresetAnswer]
  scanning: Boolean
  power: Power
  contacts: [SensorContact]
  armyContacts: [SensorContact]
  damage: Damage
}
type SensorContact {
  id: ID
  name: String
  size: Float
  icon: String
  iconUrl: String
  picture: String
  pictureUrl: String
  color: String
  speed: Float
  velocity: Coordinates
  location: Coordinates
  destination: Coordinates
  infrared: Boolean
  cloaked: Boolean
  destroyed: Boolean
  forceUpdate: Boolean
}
type PresetAnswer {
  label: String
  value: String
}
input PresetAnswerInput {
  label: String
  value: String
}
input CoordinatesInput {
  x: Float
  y: Float
  z: Float
}
input SensorContactInput {
  id: ID
  name: String
  size: Float
  icon: String
  picture: String
  color: String
  speed: Float
  location: CoordinatesInput
  destination: CoordinatesInput
  infrared: Boolean
  cloaked: Boolean
  destroyed: Boolean
}
enum PING_MODES {
  active
  passive
  manual
}
`;
