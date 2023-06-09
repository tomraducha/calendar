import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import PropTypes from "prop-types";
import Favorites from "./Favorites/Favorites";
import { StyledTextField } from "./style";
import { updateSpecialEvent } from "../utilsApi";

function PopupEvent({ event, setOpenPopup }) {
  const [popupState, setPopupState] = useState({
    open: event !== null,
    title: event?.title || "",
    startDate: event?.start || new Date(),
    endDate: event?.end || new Date(),
  });

  function handleClose() {
    setPopupState((prevState) => ({ ...prevState, open: false }));
    setOpenPopup(false);
  }

  function formatDate(date) {
    `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${(
      "0" + date.getDate()
    ).slice(-2)}`;
  }

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

  useEffect(() => {
    setPopupState({
      open: event !== null,
      title: event?.title || "",
      startDate: event?.start || new Date(),
      endDate: event?.end || new Date(),
    });
  }, [event]);

  return (
    <Dialog open={popupState.open} onClose={handleClose}>
      <Favorites />
      <DialogTitle>Modifier l'événement</DialogTitle>
      <DialogContent>
        <StyledTextField
          margin="dense"
          label="Début"
          type="datetime-local"
          fullWidth
          value={new Date(popupState.startDate).toISOString().substring(0, 16)}
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
          value={
            popupState.endDate
              ? new Date(popupState.endDate).toISOString().substring(0, 16)
              : ""
          }
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

PopupEvent.propTypes = {
  event: PropTypes.object,
  setOpenPopup: PropTypes.func.isRequired,
  updateEvent: PropTypes.func.isRequired,
};

export default PopupEvent;
