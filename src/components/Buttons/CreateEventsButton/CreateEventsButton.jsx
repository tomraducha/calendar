/* BTIB */
import ModalCreateEvents from "../../ModalEvents/ModalCreateEvents/ModalCreateEvents";
import { StyledButton } from "./style";
/* Libs & plugins */
import PropTypes from "prop-types";
import { useState } from "react";

function CreateEventsButton({ events, setEvents, needUpdate }) {
  const [open, setOpen] = useState(false);

  ////////////////////////////////////////////////////////////////
  // Event handlers
  ////////////////////////////////////////////////////////////////

  function handleOpen() {
    setOpen(true);
  }

  ////////////////////////////////////////////////////////////////
  // JSX
  ////////////////////////////////////////////////////////////////

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
