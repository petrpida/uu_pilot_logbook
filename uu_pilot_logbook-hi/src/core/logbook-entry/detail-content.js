//@@viewOn:imports
import { createVisualComponent, Utils, Content, PropTypes } from "uu5g05";
import Config from "./config/config.js";
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

const DetailContent = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "DetailContent",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    logbookEntryDataObject: PropTypes.object.isRequired,
    pilotDataObject: PropTypes.object.isRequired,
    placeDataList: PropTypes.object.isRequired,
    aircraftDataObject: PropTypes.object.isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    console.log(props)
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());

    return (
      <div {...attrs}>
        Detail Content
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { DetailContent };
export default DetailContent;
//@@viewOff:exports
