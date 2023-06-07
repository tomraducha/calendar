import { useEffect, useRef } from "react";
import { Draggable } from "@fullcalendar/interaction";
import Select from "react-select";
import PropTypes from "prop-types";
import InfoEvents from "./InfoEvents/InfoEvents";
import CreateEventsButton from "./CreateEventsButton/CreateEventsButton";
import { StyledButtonContainer } from "./CreateEventsButton/style";
import { StyledTypography } from "./InfoEvents/style";
function EventDropdown({ events }) {
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

  const options = events
    .filter((event) => event.title)
    .map((event) => ({
      value: event.id,
      label: event.title,
    }));

  return (
    <>
      <StyledButtonContainer>
        <CreateEventsButton />
      </StyledButtonContainer>
      <div id="menu-events" ref={draggableEl}>
        <StyledTypography>Events</StyledTypography>
        <Select
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              borderColor: state.isFocused ? "grey" : "white",
              padding: "0.1rem",
              margin: "0.4rem",
            }),
          }}
          options={options}
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
      <InfoEvents events={events} />
    </>
  );
}

EventDropdown.propTypes = {
  data: PropTypes.array,
  events: PropTypes.array,
  innerRef: PropTypes.func,
  innerProps: PropTypes.object,
};

export default EventDropdown;
