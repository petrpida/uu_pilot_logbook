//@@viewOn:imports
import { createVisualComponent, Utils, PropTypes, Lsi } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import DataObjectStateResolver from "../data-object-state-resolver";
import DataListStateResolver from "../data-list-state-resolver";
import DetailContent from "./detail-content";
import Config from "./config/config";
import importLsi from "../../lsi/import-lsi";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({ margin: "16px"}),
};
//@@viewOff:css

const STATICS = {
  //@@viewOn:statics
  uu5Tag: Config.TAG + "DetailView",
  //@@viewOff:statics
};

const DetailView = createVisualComponent({
  ...STATICS,

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
    //@@viewOff:private

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);
    return (
      <div className={Css.main()}>
        <Uu5Elements.Block
          {...attrs}
          info={<Lsi import={importLsi} path={[DetailView.uu5Tag, "info"]}/>}
          header={<Lsi import={importLsi} path={[DetailView.uu5Tag, "header"]}/>}
          headerType="heading"
          card="none"
        >
          <DataObjectStateResolver dataObject={props.logbookEntryDataObject}>
            <DataObjectStateResolver dataObject={props.pilotDataObject}>
              <DataListStateResolver dataList={props.placeDataList}>
                <DataObjectStateResolver dataObject={props.aircraftDataObject}>
                  <DetailContent
                    logbookEntryDataObject={props.logbookEntryDataObject}
                    pilotDataObject={props.pilotDataObject}
                    placeDataList={props.placeDataList}
                    aircraftDataObject={props.aircraftDataObject}
                  />
                </DataObjectStateResolver>
              </DataListStateResolver>
            </DataObjectStateResolver>
          </DataObjectStateResolver>
        </Uu5Elements.Block>
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:helpers
//@@viewOff:helpers

//@@viewOn:exports
export { DetailView };
export default DetailView;
//@@viewOff:exports
