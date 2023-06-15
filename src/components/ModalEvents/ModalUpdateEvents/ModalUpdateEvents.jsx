/* BTIB */
import FavoritesButton from "../../Buttons/FavoritesButton/FavoritesButton";
import { updateSpecialEvent } from "../../utilsApi";
import { StyledTextField } from "./style";
/* Libs & plugins */
import * as utilsMaterialUI from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const { Button, Dialog, DialogTitle, DialogContent, DialogActions } =
  utilsMaterialUI;

function ModalUpdateEvents({ event, onClose }) {
  //mettre dans des variables
  const [popupState, setPopupState] = useState({
    open: event !== null,
    title: event?.title || "",
    startDate: event?.start || new Date(),
    endDate: event?.end || new Date(),
  });

  useEffect(() => {
    setPopupState({
      open: event !== null,
      title: event?.title || "",
      startDate: event?.start || new Date(),
      endDate: event?.end || new Date(),
    });
  }, [event]);

  ////////////////////////////////////////////////////////////////
  // Event handlers
  ////////////////////////////////////////////////////////////////

  function handleClose() {
    setPopupState((prevState) => ({ ...prevState, open: false }));
    onClose();
  }

  //utiliser useRef
  // inputRef.current.value
  function handleSave() {
    const updatedEvent = {
      id: event.id,
      start: formatDate(new Date(popupState.startDate)),
      end: formatDate(new Date(popupState.endDate)),
      title: popupState.title,
    };
    updateSpecialEvent(event.id, updatedEvent);
    handleClose();
  }

  ////////////////////////////////////////////////////////////////
  // Methods
  ////////////////////////////////////////////////////////////////

  function formatDate(date) {
    `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${(
      "0" + date.getDate()
    ).slice(-2)}`;
  }

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
    <Dialog open={popupState.open} onClose={handleClose}>
      <FavoritesButton />
      <DialogTitle>Modifier l'événement</DialogTitle>
      <DialogContent>
        <StyledTextField
          margin="dense"
          label="Début"
          type="datetime-local"
          fullWidth
          value={
            //mettre dans une variable
            popupState.startDate ? convertToCEST(popupState.startDate) : ""
          }
          onChange={(e) =>
            setPopupState((prevState) => ({
              ...prevState,
              startDate: new Date(e.target.value),
            }))
          }
        />
        <StyledTextField
          margin="dense"
          label="Fin"
          type="datetime-local"
          fullWidth
          value={popupState.endDate ? convertToCEST(popupState.endDate) : ""}
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

ModalUpdateEvents.propTypes = {
  event: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  updateEvent: PropTypes.func.isRequired,
};

export default ModalUpdateEvents;
