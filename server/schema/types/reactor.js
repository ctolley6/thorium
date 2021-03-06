export default `
type Reactor implements SystemInterface{
  id: ID
  simulatorId: ID
  type: String
  name: String
  displayName: String
  stealthFactor: Float
  power: Power
  heat: Float
  coolant: Float
  damage: Damage
  #One of 'reactor' or 'battery'
  model: REACTOR_MODELS
  ejected: Boolean
  externalPower: Boolean
  powerOutput: Int
  efficiency: Float
  batteryChargeLevel: Float
  batteryChargeRate: Float
}

enum REACTOR_MODELS {
  reactor
  battery
}
`;
