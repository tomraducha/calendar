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
      id: info.event.id,
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
        // drop={handleEventReceive}
        events={events}
        eventReceive={handleEventReceive}
      />
    </div>
  );
}

export default Calendar;
