function eventChange(info) {
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

function eventReceive(info) {
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

function dateSelect(selectInfo) {
  let title = prompt("Please enter the event title");
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

export { eventChange, eventReceive, dateSelect };
