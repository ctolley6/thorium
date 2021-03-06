export default `

type Mission {
  id: ID
  name: String
  description: String
  timeline: [TimelineStep]
}

input MacroInput {
  event: String,
  args: String
}

type Flight {
  id: ID
  name: String
  date: String
  running: Boolean
  timelineStep: Int
  simulators: [Simulator]
}

input SimulatorInput {
  simulatorId: ID!,
  stationSet: ID!,
  missionId: ID
}

type Simulator {
  id: ID
  name: String
  alertlevel: String
  layout: String
  template: Boolean
  templateId: ID
  systems: [System]
  systemsFull: [SystemUnion]
  stations: [Station]
  mission: Mission
  currentTimelineStep: Int
  stationSets: [Stationset]
  stationSet: Stationset
  decks: [Deck]
  rooms: [Room]
  ship: Ship
}

type TemplateSimulator {
  id: ID
  name: String
  timeline: [TimelineStep]
}

type Stationset {
  id: ID
  name: String
  simulator: Simulator
  stations: [Station]
}

type Station {
  name: String
  login: Boolean
  messageGroups: [String]
  cards: [Card]
}

type Card {
  name: String
  component: String
}

type Notification {
  id: ID
  title: String
  body: String
  color: String
  trigger: String
  duration: Int
}
`;
