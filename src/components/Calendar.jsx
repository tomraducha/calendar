import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useState } from "react";

function Calendar() {
  const [events, setEvents] = useState([]);

  const headerOptions = {
    left: "prev,next today",
    center: "title",
    right: "dayGridMonth,timeGridWeek,timeGridDay",
  };

  function handleEventReceive(info) {
    const newEvent = {
      title: info.event.title,
      start: info.event.start,
      end: new Date(info.event.start.getTime() + 60 * 60 * 1000),
      id: info.event.id,
      allDay: true,
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
        id: Date.now(),
        allDay: selectInfo.allDay,
      };
      calendarApi.addEvent(newEvent);
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    }
  }

  return (
    <div className="full-calendar">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        headerToolbar={headerOptions}
        events={events}
        select={handleDateSelect}
        eventReceive={handleEventReceive}
        hiddenDays={[0, 6]}
        initialView="dayGridMonth"
        editable
        droppable
        selectable
        dayMaxEvents
      />
    </div>
  );
}

export default Calendar;
