import { useEffect, useState } from "react";
import { Menu, MenuItem, Button } from "@mui/material";
import { events } from "../data/events";

function EventDropdown() {
  useEffect(() => {
    let draggables = document.getElementsByClassName("draggable-event");
    for (let i = 0; i < draggables.length; i++) {
      draggables[i].setAttribute("draggable", "true");
      draggables[i].addEventListener("dragstart", (ev) => {
        ev.dataTransfer.setData("event", draggables[i].innerText);
      });
    }
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="event-dropdown">
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Events
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {events.map((event, i) => (
          <MenuItem key={i} className="draggable-event">
            {event}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default EventDropdown;
