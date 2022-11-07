//@@viewOn:imports
import { createVisualComponent, useRoute } from "uu5g05";
import Config from "./config/config";
import RouteBar from "../core/route-bar";
import DetailNew from "../core/logbook-entry/detail-new";
//@@viewOff:imports

const EntryDetail = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "EntryDetail",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render() {
    //@@viewOn:private
    const [route] = useRoute();
    //@@viewOff:private

    //@@viewOn:render
    return (
      <>
        <RouteBar/>
        <DetailNew entryId={route.params.id}/>
      </>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { EntryDetail };
export default EntryDetail;
//@@viewOff:exports
