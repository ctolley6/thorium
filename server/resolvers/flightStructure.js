import App from "../../app";
import uuid from "uuid";

export const FlightStructureQueries = {
  simulators: (root, { template, id }) => {
    let returnVal = App.simulators;
    if (id) returnVal = returnVal.filter(s => s.id === id);
    if (template) returnVal = returnVal.filter(s => s.template);
    return returnVal;
  },
  flights(root, { running, id }) {
    let returnRes = App.flights;
    if (running) {
      returnRes = returnRes.filter(f => f.running);
    }
    if (id) {
      returnRes = returnRes.filter(f => f.id === id);
    }
    return returnRes;
  },
  stations() {
    return App.stationSets;
  },
  missions() {
    return App.missions;
  }
};

export const FlightStructureMutations = {
  test(root, args, context) {
    App.test(args);
    return "";
  },

  // Mission
  createMission(root, args, context) {
    App.handleEvent(
      Object.assign(args, { id: uuid.v4() }),
      "createMission",
      context
    );
  },
  removeMission(root, args, context) {
    App.handleEvent(args, "removeMission", context);
  },
  editMission(root, args, context) {
    App.handleEvent(args, "editMission", context);
  },

  // Flight
  startFlight(root, args, context) {
    const flightId = uuid.v4();
    App.handleEvent(
      Object.assign(args, { id: flightId }),
      "startFlight",
      context
    );
    return flightId;
  },

  // Simulator
  createSimulator(root, args, context = {}) {
    App.handleEvent(
      Object.assign(args, { id: uuid.v4() }),
      "createSimulator",
      context
    );
  },
  removeSimulator(root, args, context) {
    App.handleEvent(args, "removeSimulator", context);
  },
  renameSimulator(root, args, context) {
    App.handleEvent(args, "renameSimulator", context);
  },
  changeSimulatorLayout(root, args, context) {
    App.handleEvent(args, "changeSimulatorLayout", context);
  },
  changeSimulatorAlertLevel(root, args, context) {
    App.handleEvent(args, "changeSimulatorAlertLevel", context);
  },
  setSimulatorTimelineStep(root, args, context) {
    App.handleEvent(args, "setSimulatorTimelineStep", context);
  },
  // Timeline
  addTimelineStep(root, args, context) {
    App.handleEvent(
      Object.assign(args, { timelineStepId: uuid.v4() }),
      "addTimelineStep",
      context
    );
  },
  removeTimelineStep(root, args, context) {
    App.handleEvent(args, "removeTimelineStep", context);
  },
  reorderTimelineStep(root, args, context) {
    App.handleEvent(args, "reorderTimelineStep", context);
  },
  updateTimelineStep(root, args, context) {
    App.handleEvent(args, "updateTimelineStep", context);
  },
  addTimelineItemToTimelineStep(root, args, context) {
    App.handleEvent(
      Object.assign(args, { timelineItemId: uuid.v4() }),
      "addTimelineItemToTimelineStep",
      context
    );
  },
  removeTimelineStepItem(root, args, context) {
    App.handleEvent(args, "removeTimelineStepItem", context);
  },
  updateTimelineStepItem(root, args, context) {
    App.handleEvent(args, "updateTimelineStepItem", context);
  },
  triggerMacros(root, { simulatorId, macros }, context) {
    macros.forEach(({ event, args }) => {
      App.handleEvent(Object.assign({ simulatorId }, JSON.parse(args)), event);
    });
  },

  // Station
  createStationSet(root, args, context) {
    App.handleEvent(args, "createStationSet", context);
  },
  removeStationSet(root, args, context) {
    App.handleEvent(args, "removeStationSet", context);
  },
  renameStationSet(root, args, context) {
    App.handleEvent(args, "renameStationSet", context);
  },
  addStationToStationSet(root, args, context) {
    App.handleEvent(args, "addStationToStationSet", context);
  },
  removeStationFromStationSet(root, args, context) {
    App.handleEvent(args, "removeStationFromStationSet", context);
  },
  editStationInStationSet(root, args, context) {
    App.handleEvent(args, "editStationInStationSet", context);
  },
  addCardToStation(root, args, context) {
    App.handleEvent(args, "addCardToStation", context);
  },
  removeCardFromStation(root, args, context) {
    App.handleEvent(args, "removeCardFromStation", context);
  },
  editCardInStationSet(root, args, context) {
    App.handleEvent(args, "editCardInStationSet", context);
  }
};

export const FlightStructureSubscriptions = {
  stationSetUpdate: rootValue => {
    return rootValue;
  },
  missionsUpdate: (rootValue, { missionId }) => {
    if (missionId) {
      return rootValue.filter(m => m.id === missionId);
    }
    return rootValue;
  },
  simulatorsUpdate: (rootValue, { simulatorId, template }) => {
    let returnVal = rootValue;
    if (template) returnVal = returnVal.filter(s => s.template);
    if (simulatorId) returnVal = returnVal.filter(s => s.id === simulatorId);
    return returnVal.length > 0 ? returnVal : null;
  },
  flightsUpdate: (rootValue, { id }) => {
    if (id) return rootValue.filter(s => s.id === id);
    return rootValue;
  }
};

export const FlightStructureTypes = {
  Simulator: {
    decks(rootValue) {
      return App.decks.filter(d => d.simulatorId === rootValue.id);
    },
    rooms(rootValue) {
      return App.rooms.filter(r => r.simulatorId === rootValue.id);
    },
    systems(rootValue) {
      return App.systems.filter(s => s.simulatorId === rootValue.id);
    },
    stationSets(rootValue) {
      return App.stationSets.filter(s => s.simulatorId === rootValue.id);
    },
    stationSet(rootValue) {
      return App.stationSets.find(s => s.id === rootValue.stationSet);
    }
  },
  Stationset: {
    simulator(rootValue) {
      return App.simulators.find(s => s.id === rootValue.simulatorId);
    }
  },
  Flight: {
    date(rootValue) {
      const date = new Date(rootValue.date);
      return date.toISOString();
    },
    simulators(rootValue) {
      return rootValue.simulators.map(s =>
        App.simulators.find(sim => sim.id === s)
      );
    }
  },
  Mission: {
    id(rootValue) {
      const mission = rootValue.timeline
        ? rootValue
        : App.missions.find(m => m.id === rootValue);
      return mission.id;
    },
    name(rootValue) {
      const mission = rootValue.timeline
        ? rootValue
        : App.missions.find(m => m.id === rootValue);
      return mission.name;
    },
    description(rootValue) {
      const mission = rootValue.timeline
        ? rootValue
        : App.missions.find(m => m.id === rootValue);
      return mission.description;
    },
    timeline(rootValue) {
      const mission = rootValue.timeline
        ? rootValue
        : App.missions.find(m => m.id === rootValue);
      return Object.keys(mission.timeline).sort().map(k => {
        const value = mission.timeline[k];
        value.order = k;
        return value;
      });
    }
  }
};
