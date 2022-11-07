//@@viewOn:imports
import { createVisualComponent, Utils, useLsi, PropTypes } from "uu5g05";
import Config from "./config/config.js";
import { Box, DateTime, Text } from "uu5g05-elements";
import importLsi from "../../lsi/import-lsi";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({ display: "flex", flexDirection: "column", padding: "16px 0" }),
  header: () => Config.Css.css({ padding: "16px" }),
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
    const lsi = useLsi(importLsi, [DetailContent.uu5Tag]);
    const logbookEntryDataObject = props.logbookEntryDataObject
    const pilotDataObject = props.pilotDataObject.data
    const aircraft = props.aircraftDataObject.data

    const flightFrom = props.placeDataList.data.filter((place) => place.data.id === logbookEntryDataObject.data.departurePlaceId)[0].data;
    const flightTo = props.placeDataList.data.filter((place) => place.data.id === logbookEntryDataObject.data.arrivalPlaceId)[0].data;
    const flightDuration = (Date.parse(logbookEntryDataObject.data.arrivalDateTime) - Date.parse(logbookEntryDataObject.data.departureDateTime))/60000;
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());

    return (
      <div {...attrs}>
        <Box className={Css.main()}>
          <Text category="interface" segment="title" type="major" colorScheme="highest" className={Css.header()}>
            {`${flightFrom.name} > ${flightTo.name}`}
          </Text>

          <Text category="interface" segment="title" type="minor" colorScheme="building" className={Css.header()}>
            {lsi.departureTime}
            <DateTime value={logbookEntryDataObject.data.departureDateTime} dateFormat="short"/>
          </Text>

          <Text category="interface" segment="title" type="minor" colorScheme="building" className={Css.header()}>
            {lsi.arrivalTime}
            <DateTime value={logbookEntryDataObject.data.arrivalDateTime} dateFormat="short" />
          </Text>

          <Text category="interface" segment="title" type="minor" colorScheme="building" className={Css.header()}>
            {`${lsi.duration} ${flightDuration} ${lsi.minutes}`}
          </Text>

          <Text category="interface" segment="title" type="minor" colorScheme="building" className={Css.header()}>
            {`${lsi.pilot} ${pilotDataObject.name}`}
          </Text>

          <Text category="interface" segment="title" type="minor" colorScheme="building" className={Css.header()}>
            {`${lsi.model} ${aircraft.model}`}
          </Text>

          <Text category="interface" segment="title" type="minor" colorScheme="building" className={Css.header()}>
            {`${lsi.registration} ${aircraft.registration}`}
          </Text>

          <Text category="interface" segment="title" type="minor" colorScheme="building" className={Css.header()}>
            {`${lsi.departure} ${flightFrom.name}, ${flightFrom.code}, GPS: ${flightFrom.gpsCoordinates}`}
          </Text>

          <Text category="interface" segment="title" type="minor" colorScheme="building" className={Css.header()}>
            {`${lsi.arrival} ${flightTo.name}, ${flightTo.code}, GPS: ${flightTo.gpsCoordinates}`}
          </Text>
        </Box>
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { DetailContent };
export default DetailContent;
//@@viewOff:exports
