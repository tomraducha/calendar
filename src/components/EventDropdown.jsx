import { useEffect, useRef } from "react";
import { Draggable } from "@fullcalendar/interaction";
import Select from "react-select";

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

  const eventOptions = [
    { value: "event-1", label: "Mon premier événement" },
    { value: "event-2", label: "Mon deuxième événement" },
    { value: "event-3", label: "Mon troisième événement" },
  ];

  return (
    <div id="external-events" ref={draggableEl}>
      <h3>Événements</h3>
      <Select
        options={eventOptions}
        components={{
          Option: ({ children, innerRef, innerProps }) => {
            return (
              <div
                ref={innerRef}
                {...innerProps}
                className="fc-event"
                style={{ cursor: "move" }}
              >
                {children}
              </div>
            );
          },
        }}
      />
    </div>
  );
}

export default EventDropdown;
