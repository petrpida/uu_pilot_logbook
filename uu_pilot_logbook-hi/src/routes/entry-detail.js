//@@viewOn:imports
import { createVisualComponent, useRoute } from "uu5g05";
import { RouteController } from "uu_plus4u5g02-app";
import RouteContainer from "../core/route-container";
import Detail from "../core/logbook-entry/detail";
import Config from "./config/config";
import RouteBar from "../core/route-bar";
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
      <RouteController>
        <RouteContainer>
          <RouteBar/>
          <Detail entryId={route.params.id} />
        </RouteContainer>
      </RouteController>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { EntryDetail };
export default EntryDetail;
//@@viewOff:exports
