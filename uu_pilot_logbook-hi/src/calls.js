import { Environment } from "uu5g05";
import Plus4U5 from "uu_plus4u5g02";

// the base URI of calls for development / staging environments can be configured in *-hi/env/development.json
// (or <stagingEnv>.json), e.g.:
//   "uu5Environment": {
//     "callsBaseUri": "http://localhost:8080/vnd-app/awid"
//   }
const CALLS_BASE_URI =
  (process.env.NODE_ENV !== "production" ? Environment.get("callsBaseUri") : null) || Environment.appBaseUri;

const Calls = {
  async call(method, url, dtoIn, clientOptions) {
    const response = await Plus4U5.Utils.AppClient[method](url, dtoIn, clientOptions);
    return response.data;
  },

  logbookEntry: {
    list(dtoIn) {
      const commandUri = Calls.getCommandUri("logbookEntry/list");
      return Calls.call("get", commandUri, dtoIn);
    },

    create(dtoIn) {
      const commandUri = Calls.getCommandUri("logbookEntry/create");
      return Calls.call("post", commandUri, dtoIn);
    },

    get(dtoIn) {
      const commandUri = Calls.getCommandUri("logbookEntry/get");
      return Calls.call("get", commandUri, dtoIn);
    },

    update(dtoIn) {
      const commandUri = Calls.getCommandUri("logbookEntry/update");
      return Calls.call("post", commandUri, dtoIn);
    },
  },

  Pilot: {
    list(dtoIn) {
      const commandUri = Calls.getCommandUri("pilot/list");
      return Calls.call("get", commandUri, dtoIn);
    },
    get(dtoIn) {
      const commandUri = Calls.getCommandUri("pilot/get");
      return Calls.call("get", commandUri, dtoIn);
    },
  },

  Aircraft: {
    list(dtoIn) {
      const commandUri = Calls.getCommandUri("aircraft/list");
      return Calls.call("get", commandUri, dtoIn);
    },
    get(dtoIn) {
      const commandUri = Calls.getCommandUri("aircraft/get");
      return Calls.call("get", commandUri, dtoIn);
    },
  },

  Place: {
    list(dtoIn) {
      const commandUri = Calls.getCommandUri("place/list");
      return Calls.call("get", commandUri, dtoIn);
    },
  },

  // // example for mock calls
  // loadDemoContent(dtoIn) {
  //   const commandUri = Calls.getCommandUri("loadDemoContent");
  //   return Calls.call("get", commandUri, dtoIn);
  // },

  loadIdentityProfiles() {
    const commandUri = Calls.getCommandUri("sys/uuAppWorkspace/initUve");
    return Calls.call("get", commandUri);
  },

  initWorkspace(dtoInData) {
    const commandUri = Calls.getCommandUri("sys/uuAppWorkspace/init");
    return Calls.call("post", commandUri, dtoInData);
  },

  getWorkspace() {
    const commandUri = Calls.getCommandUri("sys/uuAppWorkspace/get");
    return Calls.call("get", commandUri);
  },

  async initAndGetWorkspace(dtoInData) {
    await Calls.initWorkspace(dtoInData);
    return await Calls.getWorkspace();
  },

  getCommandUri(useCase, baseUri = CALLS_BASE_URI) {
    return (!baseUri.endsWith("/") ? baseUri + "/" : baseUri) + (useCase.startsWith("/") ? useCase.slice(1) : useCase);
  },
};

export default Calls;
