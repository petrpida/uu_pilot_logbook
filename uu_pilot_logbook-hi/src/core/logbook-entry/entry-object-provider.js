//@@viewOn:imports
import { createComponent, PropTypes, useDataObject } from "uu5g05";
import Config from "./config/config.js";
import Calls from "calls";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const EntryObjectProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "EntryObjectProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    entryId: PropTypes.string.isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    entryId: "",
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const logbookEntryDataObject = useDataObject({
      handlerMap: {
        load: handleLoad,
      },
    });

    function handleLoad() {
      return Calls.logbookEntry.get({ id: props.entryId });
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return typeof props.children === "function" ? props.children(logbookEntryDataObject) : props.children;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export default EntryObjectProvider;
//@@viewOff:exports
