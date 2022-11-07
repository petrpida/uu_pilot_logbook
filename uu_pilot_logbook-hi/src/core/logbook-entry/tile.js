//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils, useLsi } from "uu5g05";
import { Box, Text, Button, DateTime } from "uu5g05-elements";
import Config from "./config/config.js";
import importLsi from "../../lsi/import-lsi";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  main: () =>
    Config.Css.css({
      marginTop: "16px",
      display: "flex",
      flexDirection: "column",
      height: "100%",
    }),

  header: () =>
    Config.Css.css({
      display: "block",
      textAlign: "center",
      padding: 16,
      height: 48,
    }),

  footer: () =>
    Config.Css.css({
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: 48,
      marginTop: 8,
      paddingLeft: 16,
      paddingRight: 8,
    }),

  infoLine: () =>
    Config.Css.css({
      display: "block",
      marginLeft: 16,
      marginTop: 8,
    }),
};
//@@viewOff:css

//@@viewOn:helpers
function InfoLine({ children }) {
  return (
    <Text
      category="interface"
      segment="content"
      type="medium"
      significance="subdued"
      colorScheme="building"
      className={Css.infoLine()}
    >
      {children}
    </Text>
  );
}
//@@viewOff:helpers

const Tile = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Tile",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    entryList: PropTypes.object.isRequired,
    pilotsDataList: PropTypes.object.isRequired,
    placeDataList: PropTypes.object.isRequired,
    aircraftDataList: PropTypes.object.isRequired,
    onUpdate: PropTypes.func,
    onDelete: PropTypes.func,
    entryPermissions: PropTypes.object,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    entryList: {},
    pilotsDataList: {},
    placeDataList: {},
    aircraftDataList: {},
    onUpdate: () => {},
    onDelete: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { data: entryDataObject } = props
    const isActionDisabled = entryDataObject.state === "pending";
    const lsi = useLsi(importLsi, [Tile.uu5Tag]);

    function handleDelete(event) {
      event.stopPropagation();
      props.onDelete(entryDataObject);
    }

    function handleUpdate(event) {
      event.stopPropagation();
      props.onUpdate(entryDataObject);
    }

    function handleDetail() {
      props.onDetail(entryDataObject.data);
    }

    function getItemActions() {
      const actionList = [];

      if (props.entryPermissions.entry.canManage) {
        actionList.push({
          icon: "mdi-pencil",
          onClick: handleUpdate,
          disabled: isActionDisabled,
        });
      }

      return actionList;
    }

    const flightFrom = props.placeDataList.data.filter((place) => place.data.id === entryDataObject.data.departurePlaceId)[0].data;
    const flightTo = props.placeDataList.data.filter((place) => place.data.id === entryDataObject.data.arrivalPlaceId)[0].data;
    const flightDuration = (Date.parse(entryDataObject.data.arrivalDateTime) - Date.parse(entryDataObject.data.departureDateTime))/60000;


    //@@viewOff:private

    //@@viewOn:render
    const [elementProps] = Utils.VisualComponent.splitProps(props, Css.main());

    return (
      <Box {...elementProps} onClick={handleDetail} actionList={getItemActions()}>
        <Text category="interface" segment="title" type="minor" colorScheme="building" className={Css.header()}>
          {`${flightFrom.name} > ${flightTo.name}`}
        </Text>

        <InfoLine>
          <Text>{`${lsi.name} ${props.pilotsDataList.data[0].data.name}`}</Text>
        </InfoLine>
        <InfoLine>
          <Text>{`${lsi.model} ${props.aircraftDataList.data[0].data.model}`}</Text>
        </InfoLine>
        <InfoLine>
          <Text>{`${lsi.registration} ${props.aircraftDataList.data[0].data.registration}`}</Text>
        </InfoLine>
        <InfoLine>
          <Text>{lsi.departure}</Text>
          <DateTime value={entryDataObject.data.departureDateTime} dateFormat="short" />
        </InfoLine>
        <InfoLine>
          <Text>{lsi.arrival}</Text>
          <DateTime value={entryDataObject.data.arrivalDateTime} dateFormat="short" />
        </InfoLine>
        <InfoLine>
          <Text>{`${lsi.duration} ${flightDuration} ${lsi.minutes}`}</Text>
        </InfoLine>

        <Box significance="distinct" className={Css.footer()}>
          <div>
            <Button
              icon="mdi-pencil"
              onClick={handleUpdate}
              significance="subdued"
              tooltip="Update"
              disabled={isActionDisabled}
            />
            <Button
              icon="mdi-delete"
              colorScheme="red"
              onClick={handleDelete}
              significance="subdued"
              tooltip="Delete"
              disabled={isActionDisabled}
            />
          </div>
        </Box>
      </Box>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Tile };
export default Tile;
//@@viewOff:exports
