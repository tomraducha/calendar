import { useEffect, useRef } from "react";
import { Draggable } from "@fullcalendar/interaction";
import CreateEventsButton from "./CreateEventsButton/CreateEventsButton";
import { StyledButtonContainer } from "./CreateEventsButton/style";
import EventDropdown from "./EventDropdown/EventDropdown";

function Menu() {
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
      <div id="menu-events" ref={draggableEl}>
        <EventDropdown />
      </div>
    </>
  );
}

export default Menu;
