//@@viewOn:imports
import { createVisualComponent } from "uu5g05";
import Config from "./config/config.js";
import PlaceListProvider from "../place/place-list-provider";
import EntryObjectProvider from "./entry-object-provider";
import PilotObjectProvider from "../pilot/pilot-object-provider";
import AircraftObjectProvider from "../aircraft/aircraft-object-provider";
import DetailView from "./detail-view";
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

const Detail = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Detail",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
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
    return (
      <EntryObjectProvider entryId={props.entryId}>
        {(logbookEntryDataObject) => (
          <PilotObjectProvider entryId={props.entryId}>
            {(pilotDataObject) => (
              <PlaceListProvider>
                {(placeDataList) => (
                  <AircraftObjectProvider entryId={props.entryId}>
                    {(aircraftDataObject) => (
                      <DetailView
                        logbookEntryDataObject={logbookEntryDataObject}
                        pilotDataObject={pilotDataObject}
                        placeDataList={placeDataList}
                        aircraftDataObject={aircraftDataObject}
                      />
                      )}
                  </AircraftObjectProvider>
                )}
              </PlaceListProvider>
            )}
          </PilotObjectProvider>
        )}
      </EntryObjectProvider>
    )
    //@@viewOff:render
  },
});

//@@viewOn:exports
export default { Detail };
//@@viewOff:exports
