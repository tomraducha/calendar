import { useEffect, useRef } from "react";
import { Draggable } from "@fullcalendar/interaction";

function EventDropdown() {
  const draggableEl = useRef(null);

  useEffect(() => {
    new Draggable(draggableEl.current, {
      itemSelector: ".fc-event",
      eventData: function (eventEl) {
        return {
          title: eventEl.innerText,
        };
      },
    });
  }, []);

  return (
    <div id="external-events" ref={draggableEl}>
      <h3>Events</h3>
      <div className="fc-event">Mon premier événement</div>
      <div className="fc-event">Mon deuxième événement</div>
      <div className="fc-event">Mon troisième événement</div>
    </div>
  );
}

export default EventDropdown;
