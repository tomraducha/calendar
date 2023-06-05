import { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import {
  HEADER_OPTIONS,
  HIDDEN_DAYS,
  INITIAL_VIEW,
  PLUGINS,
  handleDateSelect,
  handleEventChange,
  handleEventReceive,
} from "./UtilsCalendar";
import PopupEvent from "../PopupEvent/PopupEvent";

function Calendar() {
  const [events, setEvents] = useState([]);
  console.log("🚀 ~ file: Calendar.jsx:10 ~ Calendar ~ events:", events);
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const calendarRef = useRef(null);

  function handleEventResize(info) {
    setEvents(handleEventChange(info));
  }

  function handleEventDrop(info) {
    setEvents(handleEventChange(info));
  }

  function handleNewEventReceive(info) {
    setEvents(handleEventReceive(info));
  }

  function handleNewDateSelect(info) {
    const newEvents = handleDateSelect(info);
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
        eventReceive={handleNewEventReceive}
        select={handleNewDateSelect}
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

export default Calendar;
