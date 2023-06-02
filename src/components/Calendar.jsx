import { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import PopupEvent from "./PopupEvent";

const Calendar = () => {
  const [events, setEvents] = useState([]);
  console.log("🚀 ~ file: Calendar.jsx:10 ~ Calendar ~ events:", events);
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const calendarRef = useRef(null);
  const headerOptions = {
    left: "prev,next today",
    center: "title",
    right: "dayGridMonth,timeGridWeek,timeGridDay",
  };

  function formatDateISOToYYYYMMDD(dateISO) {
    const date = new Date(dateISO);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // months are 0-indexed in JS
    const day = ("0" + date.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
  }

  function handleEventReceive(info) {
    // Add one hour to start time to get end time
    const infoEventEnd = new Date(info.event.start.getTime() + 60 * 60 * 1000);

    const formattedStartDate = formatDateISOToYYYYMMDD(info.event.start);
    const formattedEndDate = formatDateISOToYYYYMMDD(infoEventEnd);

    const newEvent = {
      title: info.event.title,
      start: formattedStartDate,
      end: formattedEndDate,
      id: info.event.id,
      durationEditable: true,
    };
    setEvents((prevEvents) => {
      // Check if an event with the same id already exists
      const eventAlreadyExists = prevEvents.some(
        (event) => event.id === newEvent.id
      );
      if (!eventAlreadyExists) {
        return [...prevEvents, newEvent];
      } else {
        // If event already exists, return the previous state
        return prevEvents;
      }
    });
  }

  function handleDateSelect(selectInfo) {
    let title = prompt("Veuillez entrer le titre de l'événement");
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();

    if (title) {
      const formattedStart = formatDateISOToYYYYMMDD(selectInfo.startStr);
      const formattedEnd = formatDateISOToYYYYMMDD(selectInfo.endStr);

      const newEvent = {
        title,
        start: formattedStart,
        end: formattedEnd,
        id: Date.now().toString(),
      };
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    }
  }

  function handleEventResize(info) {
    const formattedEndDate = formatDateISOToYYYYMMDD(info.event.end);

    const resizedEventId = info.event.id;

    setEvents((prevEvents) => {
      return prevEvents.map((event) => {
        const eventId = event.id;
        if (eventId === resizedEventId) {
          return {
            ...event,
            end: formattedEndDate,
          };
        }
        return event;
      });
    });
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

  function handleEventDrop(info) {
    const draggedEvent = info.event;
    const draggedEventId = draggedEvent.id;

    const startDate = draggedEvent.start;
    const endDate = draggedEvent.end;

    if (!startDate || !endDate) {
      console.error("La date de début ou de fin est null");
      return;
    }

    let formattedStartDate;
    let formattedEndDate;

    try {
      formattedStartDate = formatDateISOToYYYYMMDD(startDate);
      formattedEndDate = formatDateISOToYYYYMMDD(endDate);
    } catch (error) {
      console.error("Erreur lors du formatage des dates", error);
      return;
    }

    setEvents((prevEvents) => {
      return prevEvents.map((event) => {
        const eventId = event.id;
        if (eventId === draggedEventId) {
          return {
            ...event,
            start: formattedStartDate,
            end: formattedEndDate,
          };
        }
        return event;
      });
    });
  }

  return (
    <div className="full-calendar">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        headerToolbar={headerOptions}
        events={events}
        eventClick={handleEventClick}
        select={handleDateSelect}
        eventReceive={handleEventReceive}
        eventResize={handleEventResize}
        eventDrop={handleEventDrop}
        ref={calendarRef}
        hiddenDays={[0, 6]}
        initialView="dayGridMonth"
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
};

export default Calendar;
