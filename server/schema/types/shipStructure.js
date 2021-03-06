export default `
type Deck {
  id: ID
  simulatorId: ID
  number: Int
  svgPath: String
  doors: Boolean
  evac: Boolean
  rooms: [Room]
  hallway: String
}

type Room {
  id: ID
  simulatorId: ID
  deck: Deck
  name: String
  gas: Boolean
  svgPath: String
  inventory: [InventoryItem]
  metadata: RoomMetadata
}

union Location = Deck | Room

type InventoryItem {
  id: ID
  simulatorId: ID
  name: String
  
  # Use only for subqueries with Room
  count: Int
  metadata: InventoryMetadata
  roomCount: [RoomCount] 
}

input InventoryItemInput {
  simulatorId: ID
  name: String
  metadata: InventoryMetadataInput
  roomCount: [RoomCountInput] 
}

type InventoryMetadata {
  type: String
  size: Int
  description: String
  image: String

  # For Probes
  science: Boolean
  # For Probes
  defense: Boolean

}

type RoomMetadata {
  inventory: Boolean
  probeInventory: Boolean
  torpedoInventory: Boolean
  coolantInventory: Boolean
}

input RoomMetadataInput {
  inventory: Boolean
  probeInventory: Boolean
  torpedoInventory: Boolean
  coolantInventory: Boolean
}

input InventoryMetadataInput {
  type: String
  size: Int
  description: String
  image: String

  # For Probes
  science: Boolean
  # For Probes
  defense: Boolean

}
type RoomCount {
  room: Room
  count: Int
}

input RoomCountInput {
  room: ID,
  count: Int
}
`;

// TODO: Maybe eventaully add edges to the hallway and room
