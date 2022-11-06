//@@viewOn:imports
import { createVisualComponent, PropTypes, Lsi, useLsi, Utils } from "uu5g05";
import { Modal } from "uu5g05-elements";
import { Form, FormSelect, FormDateTime, SubmitButton, CancelButton } from "uu5g05-forms";
import Config from "./config/config";
import importLsi from "../../lsi/import-lsi";
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

const CreateModal = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "CreateModal",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    entryList: PropTypes.object.isRequired,
    pilotsDataList: PropTypes.object.isRequired,
    placeDataList: PropTypes.object.isRequired,
    aircraftDataList: PropTypes.object.isRequired,
    shown: PropTypes.bool,
    onSaveDone: PropTypes.func,
    onCancel: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const lsi = useLsi(importLsi, [CreateModal.uu5Tag]);

    async function handleSubmit(event) {
      try {
        const values = { ...event.data.value };

        const entry = await props.entryList.handlerMap.create(values);
        props.onSaveDone(entry);
      } catch (error) {
        CreateModal.logger.error("Error submitting form", error);
        throw new Utils.Error.Message(error.message, error);
      }
    }

    function getPilotsList() {
      return props.pilotsDataList.data.map(({ data: pilot }) => {
        return { value: pilot.id, children: pilot.name };
      });
    }

    function getDeparturePlacesList() {
      return props.placeDataList.data.map(({ data: place }) => {
        return { value: place.id, children: place.name };
      });
    }

    function getArrivalPlacesList() {
      return props.placeDataList.data.map(({ data: place }) => {
        return { value: place.id, children: place.name };
      });
    }

    function getAircraftsList() {
      return props.aircraftDataList.data.map(({ data: aircraft }) => {
        return { value: aircraft.id, children: aircraft.model };
      });
    }

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const formInputCss = Config.Css.css`margin-bottom:16px`;

    const formControls = (
      <div className={Config.Css.css({ display: "flex", gap: 8, justifyContent: "flex-end" })}>
        <CancelButton onClick={props.onCancel}>{lsi.cancel}</CancelButton>
        <SubmitButton>{lsi.submit}</SubmitButton>
      </div>
    );

    return (
      <Form.Provider onSubmit={handleSubmit}>
        <Modal header={lsi.header} info={lsi.info} open={props.shown} footer={formControls}>
          <Form.View>
            <FormSelect
              label={lsi.pilot}
              name="mainPilotId"
              itemList={getPilotsList()}
              className={formInputCss}
              required
            />
            <FormSelect
              label={lsi.departure}
              name="departurePlaceId"
              itemList={getDeparturePlacesList()}
              className={formInputCss}
              required
            />
            <FormSelect
              label={lsi.arrival}
              name="arrivalPlaceId"
              itemList={getArrivalPlacesList()}
              className={formInputCss}
              required
            />
            <FormSelect
              label={lsi.aircraft}
              name="aircraftId"
              itemList={getAircraftsList()}
              className={formInputCss}
              required
            />
            <FormDateTime name={"departureDateTime"} label={lsi.departureTime} required/>
            <FormDateTime name={"arrivalDateTime"} label={lsi.arrivalTime} required/>
          </Form.View>
        </Modal>
      </Form.Provider>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { CreateModal };
export default CreateModal;
//@@viewOff:exports
