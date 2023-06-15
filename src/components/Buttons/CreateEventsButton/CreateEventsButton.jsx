/* BTIB */
import ModalCreateEvents from "../../ModalEvents/ModalCreateEvents/ModalCreateEvents";
import { StyledButton } from "./style";
/* Libs & plugins */
import { useState } from "react";

function CreateEventsButton() {
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
      <ModalCreateEvents open={open} setOpenPopup={setOpen} />
    </div>
  );
}

export default CreateEventsButton;
