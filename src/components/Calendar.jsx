import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useState } from "react";

function Calendar() {
  const [events, setEvents] = useState([]);
  console.log("🚀 ~ file: Calendar.jsx:9 ~ Calendar ~ events:", events);

  function handleEventReceive(info) {
    const newEvent = {
      title: info.event.title,
      start: info.event.start,
      end: new Date(info.event.start.getTime() + 60 * 60 * 1000),
      id: info.event.id,
      allDay: true,
    };
    setEvents(events.concat(newEvent));
  }

  function handleDateSelect(selectInfo) {
    let title = prompt("Veuillez entrer le titre de l'événement");
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();
    if (title) {
      const eventSelect = calendarApi.addEvent({
        id: Date.now(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
      setEvents(eventSelect);
    }
  }

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
        selectable={true}
        select={handleDateSelect}
        events={events}
        eventReceive={handleEventReceive}
        // dayCellContent={handleDayCellContent}
        hiddenDays={[0, 6]}
      />
    </div>
  );
}

export default Calendar;
