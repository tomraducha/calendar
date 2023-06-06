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

export { HEADER_OPTIONS, PLUGINS, HIDDEN_DAYS, INITIAL_VIEW };
