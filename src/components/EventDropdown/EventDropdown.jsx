import { useEffect, useRef } from "react";
import { Draggable } from "@fullcalendar/interaction";
import Select from "react-select";
import { eventOptions } from "../../data/eventOptions";
import PropTypes from "prop-types";
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

  return (
    <div id="external-events" ref={draggableEl}>
      <h3>Events</h3>
      <Select
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: state.isFocused ? "grey" : "white",
            padding: "0.1rem",
            margin: "0.4rem",
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
                className="fc-event fc-h-event"
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

EventDropdown.propTypes = {
  data: PropTypes.array,
  innerRef: PropTypes.func,
  innerProps: PropTypes.object,
};

export default EventDropdown;
