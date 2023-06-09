import { useState } from "react";
import { StyledButton } from "./style";
import CreateEventPopup from "./CreateEventPopup/CreateEventPopup";

function CreateEventsButton({ events, setEvents, needUpdate }) {
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(true);
  }

  return (
    <div>
      <StyledButton variant="contained" onClick={handleOpen}>
        Créer un nouvel événement
      </StyledButton>
      <CreateEventPopup
        open={open}
        setOpenPopup={setOpen}
        events={events}
        setEvents={setEvents}
        needUpdate={needUpdate}
      />
    </div>
  );
}

export default CreateEventsButton;
