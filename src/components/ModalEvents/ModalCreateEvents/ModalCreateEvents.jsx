/* BTIB */
import { addSpecialEvent } from "../../utilsApi";
import { StyledTextField } from "./style";
import Context from "../../../pages/Context";
/* Libs & plugins */
import { useState, useContext } from "react";
import * as utilsMaterialUI from "@mui/material";
import PropTypes from "prop-types";

const { Button, Dialog, DialogTitle, DialogContent, DialogActions } =
  utilsMaterialUI;

function ModalCreateEvents({ open, setOpenPopup }) {
  const { getEvents } = useContext(Context);
  // useRef
  const [popupState, setPopupState] = useState({
    title: "",
    startDate: new Date(),
    endDate: new Date(),
  });

  ////////////////////////////////////////////////////////////////
  // Event handlers
  ////////////////////////////////////////////////////////////////

  function handleClose() {
    setPopupState({
      title: "",
      startDate: new Date(),
      endDate: new Date(),
    });
    setOpenPopup(false);
  }

  function handleSave() {
    const newEvent = {
      eventName: popupState.title,
      startDate: popupState.startDate,
      endDate: popupState.endDate,
      value: true,
      eventId: Date.now().toString(),
    };

    addSpecialEvent(newEvent)
      .then(() => {
        handleClose();
        getEvents();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  ////////////////////////////////////////////////////////////////
  // Methods
  ////////////////////////////////////////////////////////////////

  function convertToCEST(date) {
    let cestDate = new Date(date.getTime() + 2 * 60 * 60 * 1000);
    let offset = cestDate.getTimezoneOffset();
    cestDate = new Date(cestDate.getTime() - offset * 60 * 1000);
    return cestDate.toISOString().substring(0, 16);
  }

  ////////////////////////////////////////////////////////////////
  // JSX
  ////////////////////////////////////////////////////////////////

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Créer un nouvel événement</DialogTitle>
      <DialogContent>
        <StyledTextField
          autoFocus
          margin="dense"
          label="Titre"
          type="text"
          fullWidth
          value={popupState.title}
          onChange={(e) => {
            setPopupState((prevState) => ({
              ...prevState,
              title: e.target.value,
            }));
            return;
          }}
        />
        <StyledTextField
          margin="dense"
          label="Début"
          type="datetime-local"
          fullWidth
          value={convertToCEST(popupState.startDate)}
          onChange={(e) => {
            setPopupState((prevState) => ({
              ...prevState,
              startDate: new Date(e.target.value),
            }));
            return;
          }}
        />

        <StyledTextField
          margin="dense"
          label="Fin"
          type="datetime-local"
          fullWidth
          value={convertToCEST(popupState.endDate)}
          onChange={(e) =>
            setPopupState((prevState) => ({
              ...prevState,
              endDate: new Date(e.target.value),
            }))
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Annuler
        </Button>
        <Button onClick={handleSave} color="primary">
          Sauvegarder
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ModalCreateEvents.propTypes = {
  open: PropTypes.bool,
  setOpenPopup: PropTypes.func,
  createEvent: PropTypes.func,
};

export default ModalCreateEvents;
