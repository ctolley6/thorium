export default `
    sensors(simulatorId: ID, domain: String): [Sensors]
    sensorContacts(sensorsId: ID): [SensorContact]
`;
