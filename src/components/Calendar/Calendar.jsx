import { useRef, useState } from "react";
import PropTypes from "prop-types";
import FullCalendar from "@fullcalendar/react";
import { dateSelect, eventChange, eventReceive } from "./UtilsCalendar";
import PopupEvent from "../PopupEvent/PopupEvent";

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
      <div>
        <p>{eventInfo.event.extendedProps.light}</p>
        <p>{eventInfo.event.title}</p>
      </div>
    );
  }

  return (
    <div className="full-calendar">
      <FullCalendar
        plugins={PLUGINS}
        headerToolbar={HEADER_OPTIONS}
        events={events}
        ref={calendarRef}
        hiddenDays={HIDDEN_DAYS}
        initialView={INITIAL_VIEW}
        eventClick={handleEventClick}
        eventResize={handleEventResize}
        eventDrop={handleEventDrop}
        eventReceive={handleEventReceive}
        dateSelect={handleDateSelect}
        eventContent={renderEventContent}
        editable
        droppable
        selectable
        dayMaxEvents
      />
      {openPopup && (
        <PopupEvent
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
