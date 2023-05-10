import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useState } from "react";

function Calendar() {
  const [events, setEvents] = useState([]);

  const handleEventReceive = (info) => {
    const newEvent = {
      title: info.event.title,
      start: info.event.start,
      end: new Date(info.event.start.getTime() + 60 * 60 * 1000), // ajoute une heure à la date de début
      id: info.event.id,
      allDay: true,
    };
    setEvents(events.concat(newEvent));
  };

  return (
    <div className="full-calendar">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        initialView="dayGridMonth"
        editable={true}
        droppable={true}
        events={events}
        eventReceive={handleEventReceive}
      />
    </div>
  );
}

export default Calendar;
