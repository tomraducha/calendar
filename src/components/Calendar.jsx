import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

function Calendar() {
  const events = [
    {
      title: "Event existant",
      start: new Date(),
    },
  ];

  return (
    <div className="full-calendar">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={events}
        editable={true}
        droppable={true}
        drop={(info) => {
          let title = info.draggedEl.textContent;
          let id = Math.random();
          info.calendar.addEvent({
            id: id,
            title: title,
            start: info.date,
            allDay: info.allDay,
          });
        }}
      />
    </div>
  );
}

export default Calendar;
