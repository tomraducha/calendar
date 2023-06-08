import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import FullCalendar from "@fullcalendar/react";
import { dateSelect, eventChange, eventReceive } from "./UtilsCalendar";
import PopupEvent from "../PopupEvent/PopupEvent";
import {
  // addSpecialEvent,
  getRecurringEvents,
  getSpecialEvents,
} from "../utilsApi";
import {
  HEADER_OPTIONS,
  HIDDEN_DAYS,
  INITIAL_VIEW,
  PLUGINS,
} from "./utilsOption";

function Calendar() {
  const [events, setEvents] = useState([]);
  console.log("🚀 ~ file: Calendar.jsx:20 ~ Calendar ~ events:", events);
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
    console.log("🚀 ~ file: Calendar.jsx:44 ~ handleDateSelect ~ info:", info);
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

  // const newEvent = {
  //   eventName: "test1 ",
  //   startDate: "2023-06-25T12:00:00.000Z",
  //   endDate: "2023-06-25T13:00:00.000Z",
  //   value: true,
  //   eventId: Date.now().toString(),
  // };

  // addSpecialEvent(newEvent).then((data) => console.log(data));

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
