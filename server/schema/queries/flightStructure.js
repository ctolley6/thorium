export default `
simulators(template: Boolean, id: String): [Simulator]
stations: [Stationset]
missions: [Mission]
flights(running: Boolean, id: ID): [Flight]
`;
