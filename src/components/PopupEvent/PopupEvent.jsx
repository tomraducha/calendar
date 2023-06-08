import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import PropTypes from "prop-types";
import Favorites from "./Favorites/Favorites";

function PopupEvent({ event, setOpenPopup, updateEvent }) {
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
      ...event,
      ...popupState,
      start: formatDate(new Date(popupState.startDate)),
      end: formatDate(new Date(popupState.endDate)),
    };

    updateEvent(updatedEvent);
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
        <TextField
          autoFocus
          margin="dense"
          label="Titre"
          type="text"
          fullWidth
          value={popupState.title}
          onChange={(e) =>
            setPopupState((prevState) => ({
              ...prevState,
              title: e.target.value,
            }))
          }
        />
        <TextField
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
        <TextField
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
