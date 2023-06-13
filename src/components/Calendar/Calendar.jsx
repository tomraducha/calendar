import { useRef, useState } from "react";
import PropTypes from "prop-types";
import FullCalendar from "@fullcalendar/react";
import { dateSelect, eventChange, eventReceive } from "./UtilsCalendar";
import ModalUpdateEvents from "../ModalEvents/ModalUpdateEvents/ModalUpdateEvents";
import { EventContentContainer } from "./style";
import { StyledTypography } from "../Buttons/FavoritesButton/styles";
import {
  HEADER_OPTIONS,
  HIDDEN_DAYS,
  INITIAL_VIEW,
  PLUGINS,
} from "./utilsOption";

function Calendar({ events, setEvents }) {
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const calendarRef = useRef(null);

  function handleEventResize(info) {
    setEvents(eventChange(info));
  }

  function handleEventDrop(info) {
    setEvents(eventChange(info));
  }

  function handleEventReceive(info) {
    setEvents(eventReceive(info));
  }

  function handleDateSelect(info) {
    const newEvents = dateSelect(info);
    if (newEvents) {
      setEvents(newEvents);
    }
  }

  function handleEventClick(info) {
    setOpenPopup(true);
    setSelectedEvent(info.event);
  }

  function updateEvent(updatedEvent) {
    setEvents((prevEvents) =>
      prevEvents.map((event) => {
        if (event.id === updatedEvent.id) {
          return updatedEvent;
        }
        return event;
      })
    );
  }

  function renderEventContent(eventInfo) {
    return (
      <EventContentContainer>
        <StyledTypography variant="body2">
          {eventInfo.event.extendedProps.light}
        </StyledTypography>
        <StyledTypography variant="body1">
          {eventInfo.event.title.length > 20
            ? eventInfo.event.title.substring(0, 8) + "..."
            : eventInfo.event.title}
        </StyledTypography>
      </EventContentContainer>
    );
  }

  const calendarOptions = {
    plugins: PLUGINS,
    headerToolbar: HEADER_OPTIONS,
    events: events,
    ref: calendarRef,
    hiddenDays: HIDDEN_DAYS,
    initialView: INITIAL_VIEW,
    eventClick: handleEventClick,
    eventResize: handleEventResize,
    eventDrop: handleEventDrop,
    eventReceive: handleEventReceive,
    dateSelect: handleDateSelect,
    eventContent: renderEventContent,
    editable: true,
    droppable: true,
    selectable: true,
    dayMaxEvents: true,
    slotLabelFormat: {
      hour: "numeric",
      hour12: false,
      timeZone: "Europe/Paris",
    },
    slotMinTime: "01:00:00",
    slotMaxTime: "24:00:00",
  };

  return (
    <div className="full-calendar">
      <FullCalendar {...calendarOptions} />
      {openPopup && (
        <ModalUpdateEvents
          event={selectedEvent}
          setOpenPopup={setOpenPopup}
          updateEvent={updateEvent}
        />
      )}
    </div>
  );
}

Calendar.propTypes = {
  events: PropTypes.array,
  setEvents: PropTypes.func,
};

export default Calendar;
