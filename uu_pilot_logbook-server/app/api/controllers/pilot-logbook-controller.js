"use strict";
const PilotLogbookAbl = require("../../abl/pilot-logbook-abl.js");

class PilotLogbookController {
  init(ucEnv) {
    return PilotLogbookAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }

  load(ucEnv) {
    return PilotLogbookAbl.load(ucEnv.getUri(), ucEnv.getSession());
  }

  loadBasicData(ucEnv) {
    return PilotLogbookAbl.loadBasicData(ucEnv.getUri(), ucEnv.getSession());
  }
}

module.exports = new PilotLogbookController();
