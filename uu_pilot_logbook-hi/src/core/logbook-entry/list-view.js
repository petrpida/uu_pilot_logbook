//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils, useLsi, Lsi, useCallback, useState, useRoute } from "uu5g05";
import { useAlertBus, Block } from "uu5g05-elements";
import { ControllerProvider } from "uu5tilesg02";
import { FilterButton, SorterButton } from "uu5tilesg02-controls";
import Config from "./config/config.js";
import DataListStateResolver from "../data-list-state-resolver";
import Content from "./list-content";
import CreateModal from "./create-modal";
import DeleteModal from "./delete-modal";
import importLsi from "../../lsi/import-lsi";
import { useSystemData } from "uu_plus4u5g02";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  tile: () => Config.Css.css({ marginBottom: 24 }),
  buttonArea: () => Config.Css.css({ textAlign: "center", marginBottom: 24 }),
};
//@@viewOff:css

const ListView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListView",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    entryList: PropTypes.object.isRequired,
    pilotsDataList: PropTypes.object.isRequired,
    placeDataList: PropTypes.object.isRequired,
    aircraftDataList: PropTypes.object.isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    entryList: {},
    pilotsDataList: {},
    placeDataList: {},
    aircraftDataList: {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const lsi = useLsi(importLsi, [ListView.uu5Tag]);
    const [, setRoute] = useRoute();
    const { data: systemData } = useSystemData();
    const { addAlert } = useAlertBus();
    const [createData, setCreateData] = useState({ shown: false });
    const [updateData, setUpdateData] = useState({ shown: false, id: undefined });
    const [deleteData, setDeleteData] = useState({ shown: false, id: undefined });

    const activeDataObjectId = updateData.id || deleteData.id;
    let activeDataObject;

    if (activeDataObjectId) {
      activeDataObject = getEntryDataObject(props.entryList, activeDataObjectId);
    }


    function showError(error, header = "") {
      addAlert({
        header,
        message: error.message,
        priority: "error",
      });
    }

    const handleCreate = useCallback(() => {
      setCreateData({ shown: true });
    }, [setCreateData]);

    const handleCreateDone = (entry) => {
      setCreateData({ shown: false });
      showCreateSuccess(entry);

      try {
        props.entryList.handlerMap.load();
      } catch (error) {
        ListView.logger.error("Error creating joke", error);
        showError(error);
      }
    };

    const handleCreateCancel = () => {
      setCreateData({ shown: false });
    };

    function showCreateSuccess(entry) {
      const message = (
        <>
          <Lsi import={importLsi} path={[ListView.uu5Tag, "createSuccessPrefix"]} />
          {`${entry.id}`}
          <Lsi import={importLsi} path={[ListView.uu5Tag, "createSuccessSuffix"]} />
        </>
      );

      addAlert({ message, priority: "success", durationMs: 5000 });
    }


    const handleDetail = (entry) => {
      setRoute("entryDetail", { id: entry.id });
    };

    const handleDelete = useCallback(
      (entryDataObject) => setDeleteData({ shown: true, id: entryDataObject.data.id }),
      [setDeleteData]
    );

    const handleDeleteDone = () => {
      setDeleteData({ shown: false });
    };

    const handleDeleteCancel = () => setDeleteData({ shown: false });


    async function handleUpdate(entryObject) {
      try {
        await entryObject.handlerMap.update();
      } catch (error) {
        ListView.logger.error("Error updating joke", error);
        showError(error, "Joke update failed!");
      }
    }

    const handleLoad = useCallback(
      async (event) => {
        try {
          await props.entryList.handlerMap.load(event?.data);
        } catch (error) {
          showError(error);
        }
      },
      [props.entryList, showError]
    );


    const handleLoadNext = useCallback(
      async (pageInfo) => {
        try {
          await props.entryList.handlerMap.loadNext(pageInfo);
        } catch (error) {
          showError(error);
        }
      },
      [props.entryList, showError]
    );

    //const profileList = systemData.profileData.uuIdentityProfileList;
    const isAuthority = true;
    const isExecutive = true;

    const entryPermissions = {
      entry: {
        canCreate: () => isAuthority || isExecutive,
        canManage: () => isAuthority ,
      },
    };
    //@@viewOff:private

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);
    const actionList = getActions(props, entryPermissions, { handleCreate });

    return (
      <>
        {createData.shown && (
          <CreateModal
            entryList={props.entryList}
            pilotsDataList={props.pilotsDataList}
            placeDataList={props.placeDataList}
            aircraftDataList={props.aircraftDataList}
            shown={true}
            onSaveDone={handleCreateDone}
            onCancel={handleCreateCancel}
          />
        )}
        {deleteData.shown && activeDataObject && (
          <DeleteModal
            entryDataObject={activeDataObject}
            onDeleteDone={handleDeleteDone}
            onCancel={handleDeleteCancel}
            shown
          />
        )}
        <ControllerProvider
          data={props.entryList.data}
        >
          <Block
            {...attrs}
            actionList={actionList}
            info="info"
            header={lsi.header}
            headerType="heading"
            card="none"
          >
            <DataListStateResolver dataList={props.entryList}>
              <DataListStateResolver dataList={props.pilotsDataList}>
                <DataListStateResolver dataList={props.placeDataList}>
                  <DataListStateResolver dataList={props.aircraftDataList}>
                    <Content
                      entryList={props.entryList}
                      pilotsDataList={props.pilotsDataList}
                      placeDataList={props.placeDataList}
                      aircraftDataList={props.aircraftDataList}
                      onLoadNext={handleLoadNext}
                      onDelete={handleDelete}
                      onDetail={handleDetail}
                    />
                  </DataListStateResolver>
                </DataListStateResolver>
              </DataListStateResolver>
            </DataListStateResolver>
          </Block>
        </ControllerProvider>
      </>
    );
    //@@viewOff:render
  },
});

//@@viewOn:helpers
function getActions(props, entryPermissions, { handleCreate }) {
  const actionList = [];

  if (props.entryList.data) {
    actionList.push({
      component: FilterButton,
    });

    actionList.push({
      component: SorterButton,
    });
  }

  if (entryPermissions.entry.canCreate()) {
    actionList.push({
      icon: "mdi-plus",
      children: <Lsi import={importLsi} path={[ListView.uu5Tag, "createEntry"]} />,
      primary: true,
      onClick: handleCreate,
      disabled: props.disabled,
    });
  }

  return actionList;
}

function getEntryDataObject(entryList, id) {
  const item =
    entryList.newData?.find((item) => item?.data.id === id) ||
    entryList.data.find((item) => item?.data.id === id);

  return item;
}


//@@viewOff:helpers

//@@viewOn:exports
export { ListView };
export default ListView;
//@@viewOff:exports
