//@@viewOn:imports
import { createVisualComponent, Utils } from "uu5g05";
import { RouteController } from "uu_plus4u5g02-app";
import Config from "./config/config.js";
import RouteBar from "../core/route-bar";
import List from "../core/logbook-entry/list";
import RouteContainer from "../core/route-container";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const PilotLogbook = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "PilotLogbook",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render

    return (
        <RouteController>
          <RouteContainer>
          <RouteBar/>
          <List/>
          </RouteContainer>
        </RouteController>
    )
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { PilotLogbook };
export default PilotLogbook;
//@@viewOff:exports
