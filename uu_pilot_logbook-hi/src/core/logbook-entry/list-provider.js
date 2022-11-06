//@@viewOn:imports
import { createComponent, useDataList, useEffect, useRef } from "uu5g05";
import Config from "./config/config";
import Calls from "calls";
//@@viewOff:imports

const ListProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const entryList = useDataList({
      handlerMap: {
        load: handleLoad,
        loadNext: handleLoadNext,
        create: handleCreate,
      },
      itemHandlerMap: {
        update: handleUpdate,
        delete: handleDelete,
      },
      pageSize: 100,
    });

    function handleLoad(dtoIn) {
      return Calls.logbookEntry.list(dtoIn);
    }

    function handleLoadNext(dtoIn) {
      return Calls.logbookEntry.list(dtoIn);
    }

    function handleCreate(values) {
      console.log(values)
      entryList.newData.push(values)
      //return Calls.logbookEntry.create(values);
    }

    async function handleUpdate(entry) {
      const dtoIn = { id: entry.id };
      return Calls.logbookEntry.update(dtoIn, props.baseUri);
    }

    function handleDelete(entry) {
      // const dtoIn = { id: entry.id };
      // return Calls.logbookEntry.delete(dtoIn, props.baseUri);
    }

    //@@viewOff:private

    //@@viewOn:render
    return typeof props.children === "function" ? props.children(entryList) : props.children;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ListProvider };
export default ListProvider;
//@@viewOff:exports
