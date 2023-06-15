/* BTIB */
import { EventContentContainer } from "./style";
import { StyledTypography } from "../Buttons/FavoritesButton/styles";
import { dateSelect, eventChange, eventReceive } from "./UtilsCalendar";
import Context from "../../pages/Context";
import { calendarOptions } from "./utilsOption";
/* Libs & Plugins */
import { useRef, useState, useContext } from "react";
import FullCalendar from "@fullcalendar/react";
import ModalUpdateEvents from "../ModalEvents/ModalUpdateEvents/ModalUpdateEvents";

function Calendar() {
  const { events } = useContext(Context);
  const { setEvents } = useContext(Context);
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const calendarRef = useRef(null);

  ////////////////////////////////////////////////////////////////
  // Event handlers
  ////////////////////////////////////////////////////////////////

  function handleEventResize(info) {
    setEvents(eventChange(info));
  }

  function handleEventDrop(info) {
    setEvents(eventChange(info));
  }

  function handleEventReceive(info) {
    setEvents(eventReceive(info));
  }

  function handleDateSelect(info) {
    const newEvents = dateSelect(info);
    if (newEvents) {
      setEvents(newEvents);
    }
  }

  function handleEventClick(info) {
    setOpenPopup(true);
    setSelectedEvent(info.event);
  }

  function handleClose() {
    setOpenPopup(false);
  }

  ////////////////////////////////////////////////////////////////
  // Methods
  ////////////////////////////////////////////////////////////////

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

  function renderEventContent(eventInfo) {
    return (
      <EventContentContainer>
        <StyledTypography variant="body2">
          {eventInfo.event.extendedProps.light}
        </StyledTypography>
        <StyledTypography variant="body1">
          {eventInfo.event.title.length > 20
            ? eventInfo.event.title.substring(0, 8) + "..."
            : eventInfo.event.title}
        </StyledTypography>
      </EventContentContainer>
    );
  }

  ////////////////////////////////////////////////////////////////
  // JSX
  ////////////////////////////////////////////////////////////////

  return (
    <div className="full-calendar">
      <FullCalendar
        {...calendarOptions}
        events={events}
        ref={calendarRef}
        eventClick={handleEventClick}
        eventResize={handleEventResize}
        eventDrop={handleEventDrop}
        eventReceive={handleEventReceive}
        dateSelect={handleDateSelect}
        eventContent={renderEventContent}
      />
      {openPopup && (
        <ModalUpdateEvents
          event={selectedEvent}
          onClose={handleClose}
          updateEvent={updateEvent}
        />
      )}
    </div>
  );
}

export default Calendar;
