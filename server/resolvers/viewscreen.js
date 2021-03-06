import App from "../../app.js";

export const ViewscreenQueries = {
  viewscreens(rootValue, { simulatorId }) {
    let viewscreens = App.clients.filter(s => s.station === "Viewscreen");
    if (simulatorId) {
      viewscreens = viewscreens.filter(v => v.simulatorId === simulatorId);
    }
    return viewscreens.map(v => App.viewscreens.find(av => av.id === v.id));
  }
};

export const ViewscreenMutations = {
  updateViewscreenName(_, params, context) {
    App.handleEvent(params, "updateViewscreenName", context);
  },
  updateViewscreenComponent(_, params, context) {
    App.handleEvent(params, "updateViewscreenComponent", context);
  }
};

export const ViewscreenSubscriptions = {
  viewscreensUpdate(rootValue, { simulatorId }) {
    let viewscreens = App.clients.filter(s => s.station === "Viewscreen");
    if (simulatorId) {
      viewscreens = viewscreens.filter(v => v.simulatorId === simulatorId);
    }
    return viewscreens.map(v => rootValue.find(av => av.id === v.id));
  }
};
