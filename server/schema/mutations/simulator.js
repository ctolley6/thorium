export default `
#Macro: Rename Simulator
renameSimulator(
simulatorId: ID!, 
name: String!): String

#Macro: Change Simulator Layout
changeSimulatorLayout(
simulatorId: ID!, 
layout: String!): String

#Macro: Change Simulator Alert Level
changeSimulatorAlertLevel(
simulatorId: ID!, 
alertLevel: String!): String

setSimulatorTimelineStep(simulatorId: ID!, step: Int!): String

shipDockingChange(simulatorId: ID!, which: String!, state: Boolean!): String

remoteAccessSendCode(simulatorId: ID!, code: String!, station: String!): String
remoteAccessUpdateCode(simulatorId: ID!, codeId: ID!, state: String!): String

setSelfDestructTime(simulatorId: ID!, time: Float): String
setSelfDestructCode(simulatorId: ID!, code: String): String
setSelfDestructAuto(simulatorId: ID!, auto: Boolean): String
`;
