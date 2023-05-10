import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";

function Calendar() {
  const handleEventReceive = (info) => {
    console.log("Received:", info.event);
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
        eventReceive={handleEventReceive}
      />
    </div>
  );
}

export default Calendar;
