// utilsCalendar.js
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";

const HEADER_OPTIONS = {
  left: "prev,next today",
  center: "title",
  right: "dayGridMonth,timeGridWeek,timeGridDay",
};

const PLUGINS = [dayGridPlugin, interactionPlugin, timeGridPlugin];
const HIDDEN_DAYS = [0, 6];
const INITIAL_VIEW = "dayGridMonth";

function handleEventChange(info) {
  return (prevEvents) =>
    prevEvents.map((event) => {
      if (event.id === info.event.id) {
        const eventStart = info.event.startStr;
        const eventEnd = info.event.endStr;
        return {
          ...event,
          start: eventStart,
          end: eventEnd,
        };
      }
      return event;
    });
}

function handleEventReceive(info) {
  const newEvent = {
    title: info.event.title,
    start: info.startStr,
    end: info.endStr,
    id: info.event.id,
    durationEditable: true,
  };
  return (prevEvents) => {
    const eventAlreadyExists = prevEvents.some(
      (event) => event.id === newEvent.id
    );
    if (!eventAlreadyExists) {
      return [...prevEvents, newEvent];
    } else {
      return prevEvents;
    }
  };
}

function handleDateSelect(selectInfo) {
  let title = prompt("Veuillez entrer le titre de l'événement");
  let calendarApi = selectInfo.view.calendar;
  calendarApi.unselect();

  if (title) {
    const formattedStart = selectInfo.startStr;
    const formattedEnd = selectInfo.endStr;
    const newEvent = {
      title,
      start: formattedStart,
      end: formattedEnd,
      id: Date.now().toString(),
    };
    return (prevEvents) => [...prevEvents, newEvent];
  }
}

export {
  HEADER_OPTIONS,
  PLUGINS,
  HIDDEN_DAYS,
  INITIAL_VIEW,
  handleEventChange,
  handleEventReceive,
  handleDateSelect,
};
