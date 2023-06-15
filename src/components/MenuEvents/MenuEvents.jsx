import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Draggable } from "@fullcalendar/interaction";
import DropdownFavorisEvents from "./DropdownFavorisEvents/DropdownFavorisEvents";
import CreateEventsButton from "../Buttons/CreateEventsButton/CreateEventsButton";
import { StyledButtonContainer } from "../Buttons/CreateEventsButton/style";
import InfoEvents from "./InfoEvents/InfoEvents";

function MenuEvents({ events, setEvents, needUpdate }) {
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
        <CreateEventsButton
          events={events}
          setEvents={setEvents}
          needUpdate={needUpdate}
        />
      </StyledButtonContainer>
      <InfoEvents events={events} needUpdate={needUpdate} />
      <div id="menu-events" ref={draggableEl}>
        <DropdownFavorisEvents events={events} />
      </div>
    </>
  );
}

MenuEvents.propTypes = {
  events: PropTypes.array,
  setEvents: PropTypes.func,
  needUpdate: PropTypes.func,
};

export default MenuEvents;
