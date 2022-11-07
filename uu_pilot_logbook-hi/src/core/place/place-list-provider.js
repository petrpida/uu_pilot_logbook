//@@viewOn:imports
import { createComponent, useDataList } from "uu5g05";
import Config from "./config/config";
import Calls from "calls";
//@@viewOff:imports

const PlaceListProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "PlaceListProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const placeDataList = useDataList({
      handlerMap: {
        load: handleLoad,
      },
    });

    function handleLoad(dtoIn) {
      return Calls.Place.list(dtoIn);
    }

    //@@viewOff:private

    //@@viewOn:render
    return typeof props.children === "function" ? props.children(placeDataList) : props.children;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { PlaceListProvider };
export default PlaceListProvider;
//@@viewOff:exports
