import App from "../../app";

export const LRCommQueries = {
  longRangeCommunications(root, { simulatorId, crew, sent }) {
    let lrComm = App.systems.filter(s => s.type === "LongRangeComm");
    if (simulatorId) lrComm = lrComm.filter(s => s.simulatorId === simulatorId);
    if (typeof crew !== "undefined") {
      lrComm = lrComm.map(s => {
        const sys = Object.assign({}, s);
        sys.messages = sys.messages.filter(m => m.crew === crew);
        return sys;
      });
    }
    if (typeof sent !== "undefined") {
      lrComm = lrComm.map(s => {
        const sys = Object.assign({}, s);
        sys.messages = sys.messages.filter(m => m.sent === sent);
        return sys;
      });
    }
    if (typeof sent !== "undefined" && typeof crew !== "undefined") {
      if (sent !== true && crew === false) {
        lrComm = lrComm.map(s => {
          const sys = Object.assign({}, s);
          sys.messages = sys.messages.filter(m => m.deleted === false);
          return sys;
        });
      }
    }
    return lrComm;
  }
};

export const LRCommMutations = {
  sendLongRangeMessage(root, args, context) {
    App.handleEvent(args, "sendLongRangeMessage", context);
  },
  longRangeMessageSend(root, args, context) {
    App.handleEvent(args, "longRangeMessageSend", context);
  },
  deleteLongRangeMessage(root, args, context) {
    App.handleEvent(args, "deleteLongRangeMessage", context);
  },
  updateLongRangeDecodedMessage(root, args, context) {
    App.handleEvent(args, "updateLongRangeDecodedMessage", context);
  }
};

export const LRCommSubscriptions = {
  longRangeCommunicationsUpdate(rootValue, { simulatorId, crew, sent }) {
    if (simulatorId)
      rootValue = rootValue.filter(s => s.simulatorId === simulatorId);
    if (typeof crew !== "undefined") {
      rootValue = rootValue.map(s => {
        const sys = Object.assign({}, s);
        sys.messages = sys.messages.filter(m => m.crew === crew);
        return sys;
      });
    }
    if (typeof sent !== "undefined") {
      rootValue = rootValue.map(s => {
        const sys = Object.assign({}, s);
        sys.messages = sys.messages.filter(m => m.sent === sent);
        return sys;
      });
    }
    if (typeof sent !== "undefined" && typeof crew !== "undefined") {
      if (sent !== true && crew === false) {
        rootValue = rootValue.map(s => {
          const sys = Object.assign({}, s);
          sys.messages = sys.messages.filter(m => m.deleted === false);
          return sys;
        });
      }
    }
    return rootValue;
  }
};
