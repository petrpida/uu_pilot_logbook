//@@viewOn:imports
import { createVisualComponent, Utils} from "uu5g05";
import Config from "./config/config.js";
import UnderConstruction from "../bricks/under-construction";
import RouteBar from "../core/route-bar";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const Pilots = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Pilots",
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
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());

    return (
      <div {...attrs}>
        <RouteBar />
        <UnderConstruction />
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Pilots };
export default Pilots;
//@@viewOff:exports
