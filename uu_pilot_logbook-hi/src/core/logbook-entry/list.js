//@@viewOn:imports
import { createVisualComponent, Utils } from "uu5g05";
import Config from "./config/config.js";
import ListProvider from "./list-provider";
import ListView from "./list-view";
import PilotListProvider from "../pilot/pilot-list-provider";
import AircraftListProvider from "../aircraft/aircraft-list-provider";
import PlaceListProvider from "../place/place-list-provider";
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

const List = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "List",
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
        <ListProvider>
          {(entryList) => (
              <PilotListProvider>
                {(pilotsDataList) => (
                    <PlaceListProvider>
                      {(placeListProvider) => (
                          <AircraftListProvider>{
                            (aircraftDataList) => (
                                <ListView
                                  entryList={entryList}
                                  pilotsDataList={pilotsDataList}
                                  placeDataList={placeListProvider}
                                  aircraftDataList={aircraftDataList}/>
                            )}
                          </AircraftListProvider>
                      )}
                    </PlaceListProvider>
                )}
              </PilotListProvider>
          )}
        </ListProvider>
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { List };
export default List;
//@@viewOff:exports
