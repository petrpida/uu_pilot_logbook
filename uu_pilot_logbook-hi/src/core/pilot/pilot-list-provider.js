//@@viewOn:imports
import { createComponent, useDataList, useEffect, useRef } from "uu5g05";
import Config from "./config/config";
import Calls from "calls";
//@@viewOff:imports

const PilotListProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "PilotListProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const pilotsDataList = useDataList({
      handlerMap: {
        load: handleLoad,
      },
    });

    const imageUrlListRef = useRef([]);

    function handleLoad(dtoIn) {
      return Calls.Pilot.list(dtoIn);
    }

    useEffect(() => {
      // We don't use it to store reference on another React component
      // eslint-disable-next-line uu5/hooks-exhaustive-deps
      return () => imageUrlListRef.current.forEach((url) => URL.revokeObjectURL(url));
      // We want to trigger this effect only once.
      // eslint-disable-next-line uu5/hooks-exhaustive-deps
    }, []);
    //@@viewOff:private

    //@@viewOn:render
    return typeof props.children === "function" ? props.children(pilotsDataList) : props.children;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { PilotListProvider };
export default PilotListProvider;
//@@viewOff:exports
