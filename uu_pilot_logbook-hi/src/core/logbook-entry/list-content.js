//@@viewOn:imports
import { createVisualComponent, Utils, PropTypes, useLsi } from "uu5g05";
import { UuGds, Text, Box } from "uu5g05-elements";
import { Grid } from "uu5tilesg02-elements";
import { FilterBar, FilterManagerModal, SorterBar, SorterManagerModal } from "uu5tilesg02-controls";
import Tile from "./tile";
import Config from "./config/config";
import importLsi from "../../lsi/import-lsi";
//@@viewOff:imports

const TILE_HEIGHT = 272; // px

// Space between rows in grid [px]
const ROW_SPACING = UuGds.SpacingPalette.getValue(["fixed", "c"]);

//@@viewOn:css
const Css = {
  grid: () => Config.Css.css({ marginTop: UuGds.SpacingPalette.getValue(["fixed", "c"]) }),
  spaceLeft: () => Config.Css.css({ marginLeft: "4px" }),
  box: () => Config.Css.css({ height: "3rem", display: "flex", justifyContent: "center", alignItems: "center" })
};
//@@viewOff:css

export const Content = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Content",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    entryList: PropTypes.object.isRequired,
    pilotsDataList: PropTypes.object.isRequired,
    placeDataList: PropTypes.object.isRequired,
    aircraftDataList: PropTypes.object.isRequired,
    onDetail: PropTypes.func,
    entryPermissions: PropTypes.object,
    onUpdate: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { entryList, ...tileProps } = props;
    const lsi = useLsi(importLsi, [Content.uu5Tag]);
    const pageSize = entryList.pageSize;
    let arr = props.entryList.data.map(item => (Date.parse(item.data.arrivalDateTime) - Date.parse(item.data.departureDateTime)))
    let durationInMilliseconds = arr.reduce((prev, curr) => prev + curr, 0)
    let hrs = Math.floor(durationInMilliseconds / 3600000)
    let mins = (durationInMilliseconds / 60000) - (hrs * 60)

    function handleLoadNext({ indexFrom }) {
      props.onLoadNext({ pageSize: pageSize, pageIndex: Math.floor(indexFrom / pageSize) });
    }

    //@@viewOff:private

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(tileProps);

    return (
      <div {...attrs}>
        <FilterBar disabled={entryList.state !== "ready"}/>
        <SorterBar disabled={entryList.state !== "ready"}/>
        <Box className={Css.box()}>
          <Text>{lsi.totalHeader}</Text>
          <Text className={Css.spaceLeft()}>{Utils.String.format(lsi["hours"], hrs.toString())}</Text>
          <Text className={Css.spaceLeft()}>{Utils.String.format(lsi["minutes"], mins.toString())}</Text>
        </Box>
        <Grid
          data={props.entryList.data}
          onLoad={handleLoadNext}
          tileMinWidth={270}
          tileMaxWidth={600}
          tileHeight={TILE_HEIGHT}
          horizontalGap={UuGds.SpacingPalette.getValue(["fixed", "c"])}
          verticalGap={ROW_SPACING}
          className={Css.grid()}
        >
          <Tile
            {...tileProps}
            onDetail={props.onDetail}
            onDelete={props.onDelete}
            onUpdate={props.onUpdate}
            entryPermissions={props.entryPermissions}/>
        </Grid>
        <FilterManagerModal/>
        <SorterManagerModal/>
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:helpers

//@@viewOff:helpers

export default Content;
