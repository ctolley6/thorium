export default `
  addSpeed(id: ID, name: String, speed: [SpeedInput]!): String 
  setSpeed(id: ID!, speed: Int!, on: Boolean): String
  setEngineSpeeds(id: ID!, speeds: [SpeedInput]!): String
  addHeat(id: ID!, heat: Float): String
  engineCool(id: ID!, state: Boolean): String
`;
