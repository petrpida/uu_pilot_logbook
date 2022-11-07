import UuPilotLogbook from "uu_pilot_logbook-hi";
import { testProperties } from "uu5g05-test";

const CONFIG = {
  props: {
    // left: {
    //   values: ["Left as text", <span key="l">Left as JSX</span>, 0],
    // },
  },
  requiredProps: {
    // children: "Children content",
  },
};

describe(`UuPilotLogbook.Core.LogbookEntry.UpdateModal`, () => {
  testProperties(UuPilotLogbook.Core.LogbookEntry.UpdateModal, CONFIG);
});
