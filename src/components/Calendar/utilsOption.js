/* Libs & plugins */
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

const calendarOptions = {
  plugins: PLUGINS,
  headerToolbar: HEADER_OPTIONS,
  hiddenDays: HIDDEN_DAYS,
  initialView: INITIAL_VIEW,
  editable: true,
  droppable: true,
  selectable: true,
  dayMaxEvents: true,
  slotLabelFormat: {
    hour: "numeric",
    hour12: false,
    timeZone: "Europe/Paris",
  },
  slotMinTime: "01:00:00",
  slotMaxTime: "24:00:00",
};

export { HEADER_OPTIONS, PLUGINS, HIDDEN_DAYS, INITIAL_VIEW, calendarOptions };
