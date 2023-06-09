import PropTypes from "prop-types";
import { useState } from "react";
import { StyledButton } from "./style";
import ModalCreateEvents from "../../ModalEvents/ModalCreateEvents/ModalCreateEvents";

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
      <ModalCreateEvents
        open={open}
        setOpenPopup={setOpen}
        events={events}
        setEvents={setEvents}
        needUpdate={needUpdate}
      />
    </div>
  );
}

CreateEventsButton.propTypes = {
  events: PropTypes.array,
  setEvents: PropTypes.func,
  needUpdate: PropTypes.func,
};

export default CreateEventsButton;
