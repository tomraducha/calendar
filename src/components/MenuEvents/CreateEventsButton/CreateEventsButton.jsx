import { useState } from "react";
import { StyledButton } from "./style";
import CreateEventPopup from "./CreateEventPopup/CreateEventPopup";

function CreateEventsButton() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <StyledButton variant="contained" onClick={handleOpen}>
        Create new events
      </StyledButton>
      <CreateEventPopup open={open} setOpenPopup={setOpen} />
    </div>
  );
}

export default CreateEventsButton;
