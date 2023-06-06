import { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import { dateSelect, eventChange, eventReceive } from "./UtilsCalendar";
import PopupEvent from "../PopupEvent/PopupEvent";
import { getRecurringEvents, getSpecialEvents } from "./utilsApi";
import {
  HEADER_OPTIONS,
  HIDDEN_DAYS,
  INITIAL_VIEW,
  PLUGINS,
} from "./utilsOption";

function Calendar() {
  const [events, setEvents] = useState([]);
  console.log("🚀 ~ file: Calendar.jsx:10 ~ Calendar ~ events:", events);
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const calendarRef = useRef(null);

  useEffect(() => {
    Promise.all([getRecurringEvents(), getSpecialEvents()]).then(
      ([recurringEvents, specialEvents]) => {
        setEvents([...recurringEvents, ...specialEvents]);
      }
    );
  }, []);

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
