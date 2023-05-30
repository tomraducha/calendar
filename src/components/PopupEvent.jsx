import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import PropTypes from "prop-types";

function PopupEvent({ event, setOpenPopup }) {
  const [open, setOpen] = useState(!!event);
  const [eventName, setEventName] = useState(event ? event.title : "");
  const [eventDate, setEventDate] = useState(event ? event.start : "");
  const [eventTime, setEventTime] = useState(event ? event.start : "");

  const handleClose = () => {
    setOpen(false);
    setOpenPopup(false);

    if (event) {
      event.setProp("title", eventName);
      event.setStart(eventDate + "T" + eventTime);
      event.setEnd(eventDate + "T" + eventTime);
    }
  };

  useEffect(() => {
    if (event) {
      setOpen(true);
      setEventName(event.title);
      setEventDate(event.start);
      setEventTime(event.start);
    } else {
      setOpen(false);
      setEventName("");
      setEventDate("");
      setEventTime("");
    }
  }, [event]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Modifier l'événement</DialogTitle>
        <DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Fermer
            </Button>
          </DialogActions>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nom de l'événement"
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            fullWidth
          />
          <TextField
            id="date"
            label="Date"
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            fullWidth
          />
          <TextField
            id="time"
            label="Heure"
            type="time"
            value={eventTime}
            onChange={(e) => setEventTime(e.target.value)}
            fullWidth
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

PopupEvent.propTypes = {
  event: PropTypes.object,
  setOpenPopup: PropTypes.func,
};

export default PopupEvent;
