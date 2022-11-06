//@@viewOn:imports
import { createVisualComponent, Utils } from "uu5g05";
import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({ margin: "32px auto", textAlign: "center" }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const UnderConstruction = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "UnderConstruction",
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
        <h1>Under construction...</h1>
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { UnderConstruction };
export default UnderConstruction;
//@@viewOff:exports
