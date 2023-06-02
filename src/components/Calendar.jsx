import { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import PopupEvent from "./PopupEvent";

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

  /**
   * Traite la réception d'un événement.
   * Cette fonction ajoute une heure à l'heure de début pour obtenir l'heure de fin.
   * Elle crée ensuite un nouvel événement avec ces informations et l'ajoute à la liste des événements.
   *
   * @param {object} info - Informations sur l'événement reçu.
   */
  function handleEventReceive(info) {
    // Add one hour to start time to get end time
    const infoEventEnd = new Date(info.event.start.getTime() + 60 * 60 * 1000);

    const startDate = info.event.start;
    const formattedStartDate = `${startDate.getFullYear()}-${(
      "0" +
      (startDate.getMonth() + 1)
    ).slice(-2)}-${("0" + startDate.getDate()).slice(-2)}`;

    const formattedEndDate = `${infoEventEnd.getFullYear()}-${(
      "0" +
      (infoEventEnd.getMonth() + 1)
    ).slice(-2)}-${("0" + infoEventEnd.getDate()).slice(-2)}`;

    const newEvent = {
      title: info.event.title,
      start: formattedStartDate,
      end: formattedEndDate,
      id: info.event.id,
      allDay: true,
      durationEditable: true,
    };
    setEvents((prevEvents) => {
      // Check if an event with the same id already exists
      const eventAlreadyExists = prevEvents.some(
        (event) => event.id === newEvent.id
      );
      if (!eventAlreadyExists) {
        return [...prevEvents, newEvent];
      } else {
        // If event already exists, return the previous state
        return prevEvents;
      }
    });
  }

  /**
   * Traite la sélection d'une date.
   * Cette fonction ouvre une boîte de dialogue invitant l'utilisateur à entrer un titre pour l'événement.
   * Si un titre est fourni, elle crée un nouvel événement avec ce titre, les dates de début et de fin sélectionnées et l'ajoute à la liste des événements.
   *
   * @param {object} selectInfo - Informations sur la date sélectionnée.
   */
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

  /**
   * Traite le redimensionnement d'un événement.
   * Cette fonction récupère la nouvelle date de fin après le redimensionnement, la formate puis met à jour la date de fin de l'événement correspondant dans la liste des événements.
   * Les logs sont utilisés pour tracer l'opération.
   *
   * @param {object} info - Informations sur l'événement redimensionné.
   */
  function handleEventResize(info) {
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

  function handleEventDrop(info) {
    const draggedEvent = info.event;
    const draggedEventId = draggedEvent.id;

    const startDate = draggedEvent.start;
    const formattedStartDate = `${startDate.getFullYear()}-${(
      "0" +
      (startDate.getMonth() + 1)
    ).slice(-2)}-${("0" + startDate.getDate()).slice(-2)}`;

    const endDate = draggedEvent.end;
    const formattedEndDate = `${endDate.getFullYear()}-${(
      "0" +
      (endDate.getMonth() + 1)
    ).slice(-2)}-${("0" + endDate.getDate()).slice(-2)}`;

    setEvents((prevEvents) => {
      return prevEvents.map((event) => {
        const eventId = event.id;
        if (eventId === draggedEventId) {
          return {
            ...event,
            start: formattedStartDate,
            end: formattedEndDate,
          };
        }
        return event;
      });
    });
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
        eventDrop={handleEventDrop}
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
