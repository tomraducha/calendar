import { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import PopupEvent from "./PopupEvent";
import { CleaningServices } from "@mui/icons-material";

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

  // useEffect(() => {
  //   const calendarApi = calendarRef.current.getApi();
  //   calendarApi.removeAllEvents();
  //   events.forEach((event) => calendarApi.addEvent(event));
  // }, [events]);

  function handleEventReceive(info) {
    // Add one hour to start time to get end time
    const infoEventEnd = new Date(info.event.start.getTime() + 60 * 60 * 1000);
    const newEvent = {
      title: info.event.title,
      start: info.event.start,
      end: infoEventEnd,
      id: info.event.id,
      allDay: true,
      durationEditable: true,
    };
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  }

  function handleDateSelect(selectInfo) {
    let title = prompt("Veuillez entrer le titre de l'événement");
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();

    if (title) {
      const newEvent = {
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        id: Date.now().toString(),
        allDay: selectInfo.allDay,
      };
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    }
  }

  function handleEventResize(info) {
    console.log(
      "🚀 ~ file: Calendar.jsx:57 ~ handleEventResize ~ info:",
      info.event
    );
    const endDate = info.event._instance.range.end;
    const formattedEndDate = `${endDate.getFullYear()}-${(
      "0" +
      (endDate.getMonth() + 1)
    ).slice(-2)}-${("0" + endDate.getDate()).slice(-2)}`;

    console.log("formattedEndDate", formattedEndDate);
    const resizedEventId = info.event.id;

    setEvents((prevEvents) => {
      return prevEvents.map((event) => {
        const eventId = event.id;
        if (eventId === resizedEventId) {
          console.log("maj");
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
