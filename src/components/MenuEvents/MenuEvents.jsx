import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Draggable } from "@fullcalendar/interaction";
import EventDropdown from "./EventDropdown/EventDropdown";
import CreateEventsButton from "./CreateEventsButton/CreateEventsButton";
import { StyledButtonContainer } from "./CreateEventsButton/style";
import InfoEvents from "./InfoEvents/InfoEvents";

function MenuEvents({ events }) {
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
      <InfoEvents events={events} />
      <div id="menu-events" ref={draggableEl}>
        <EventDropdown events={events} />
      </div>
    </>
  );
}

MenuEvents.propTypes = {
  events: PropTypes.array,
};

export default MenuEvents;
