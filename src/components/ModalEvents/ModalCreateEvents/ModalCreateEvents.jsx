/* BTIB */
import { addSpecialEvent } from "../../utilsApi";
import { StyledTextField } from "./style";
import Context from "../../../pages/Context";
/* Libs & plugins */
import { useRef, useContext } from "react";
import * as utilsMaterialUI from "@mui/material";
import PropTypes from "prop-types";

const { Button, Dialog, DialogTitle, DialogContent, DialogActions } =
  utilsMaterialUI;

function ModalCreateEvents({ open, setOpenPopup }) {
  const { getEvents } = useContext(Context);
  const titleRef = useRef();
  const startRef = useRef();
  const endRef = useRef();

  ////////////////////////////////////////////////////////////////
  // Event handlers
  ////////////////////////////////////////////////////////////////

  function handleClose() {
    setOpenPopup(false);
  }

  function handleSave() {
    const newEvent = {
      eventName: titleRef.current.value,
      startDate: new Date(startRef.current.value),
      endDate: new Date(endRef.current.value),
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
          inputRef={titleRef}
        />
        <StyledTextField
          margin="dense"
          label="Début"
          type="datetime-local"
          fullWidth
          defaultValue={convertToCEST(new Date())}
          inputRef={startRef}
        />

        <StyledTextField
          margin="dense"
          label="Fin"
          type="datetime-local"
          fullWidth
          defaultValue={convertToCEST(new Date())}
          inputRef={endRef}
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
