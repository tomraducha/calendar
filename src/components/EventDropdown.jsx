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
          id: eventEl.id,
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
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: state.isFocused ? "grey" : "black",
          }),
        }}
        options={eventOptions}
        components={{
          Option: ({ data, innerRef, innerProps }) => {
            return (
              <div
                id={data.value}
                ref={innerRef}
                {...innerProps}
                className="fc-event"
                style={{ cursor: "move" }}
              >
                {data.label}
              </div>
            );
          },
        }}
      />
    </div>
  );
}

export default EventDropdown;
