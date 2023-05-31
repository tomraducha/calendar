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

function PopupEvent({ event, setOpenPopup, updateEvent }) {
  const [open, setOpen] = useState(event ? true : false);

  const [title, setTitle] = useState(event ? event.title : "");
  const [start, setStart] = useState(event ? event.start : new Date());
  const [end, setEnd] = useState(event ? event.end : new Date());

  useEffect(() => {
    if (event) {
      setOpen(true);
      setTitle(event.title);
      setStart(new Date(event.start));
      setEnd(new Date(event.end));
    } else {
      setOpen(false);
    }
  }, [event]);

  function handleClose() {
    setOpen(false);
    setOpenPopup(false);
  }
  function handleSave() {
    // create a new event object with the updated values
    const updatedEvent = {
      id: parseInt(event.id),
      title: title,
      start: new Date(start),
      end: new Date(end),
      allDay: event.allDay,
    };
    console.log(
      "🚀 ~ file: PopupEvent.jsx:43 ~ handleSave ~ updatedEvent:",
      updatedEvent
    );

    // update the event in the parent component
    updateEvent(updatedEvent);

    handleClose();
  }

  return (
    <div>
      z
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Modifier l'événement</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Titre"
            type="text"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Début"
            type="datetime-local"
            fullWidth
            value={start.toISOString().substring(0, 16)}
            onChange={(e) => setStart(new Date(e.target.value))}
          />
          <TextField
            margin="dense"
            label="Fin"
            type="datetime-local"
            fullWidth
            value={end.toISOString().substring(0, 16)}
            onChange={(e) => setEnd(new Date(e.target.value))}
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
    </div>
  );
}

PopupEvent.propTypes = {
  event: PropTypes.object,
  setOpenPopup: PropTypes.func,
  updateEvent: PropTypes.func,
};

export default PopupEvent;
