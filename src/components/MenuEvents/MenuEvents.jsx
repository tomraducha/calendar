/* BTIB */
import DropdownFavorisEvents from "./DropdownFavorisEvents/DropdownFavorisEvents";
import CreateEventsButton from "../Buttons/CreateEventsButton/CreateEventsButton";
import { StyledButtonContainer } from "../Buttons/CreateEventsButton/style";
import InfoEvents from "./InfoEvents/InfoEvents";
/* Libs & plugins */
import { useEffect, useRef } from "react";
import { Draggable } from "@fullcalendar/interaction";

function MenuEvents() {
  const draggableEl = useRef(null);

  useEffect(() => {
    new Draggable(draggableEl.current, {
      itemSelector: ".fc-event",
      eventData: function (eventEl) {
        return {
          title: eventEl.innerText,
          id: eventEl.id,
        };
      },
    });
  }, []);

  return (
    <>
      <StyledButtonContainer>
        <CreateEventsButton />
      </StyledButtonContainer>
      <InfoEvents />
      <div id="menu-events" ref={draggableEl}>
        <DropdownFavorisEvents />
      </div>
    </>
  );
}

export default MenuEvents;
