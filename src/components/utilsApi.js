const username = import.meta.env.VITE_USERNAME;
const password = import.meta.env.VITE_PASSWORD;
const url = import.meta.env.VITE_BASE_URL;
const scheduleId = import.meta.env.VITE_SCHEDULE_ID;
const authString = username + ":" + password;
const encodedAuthString = btoa(authString);
const urlReccuringEvents = `${url}/v2/schedule/${scheduleId}/recurringEvents`;
const urlSpecialEvents = `${url}/v2/schedule/${scheduleId}/specialEvents`;

const dayOfWeekMap = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};

function checkDataValue(dataValue) {
  if (dataValue === true) {
    return "LightOn";
  } else {
    return "LightOff";
  }
}

function checkLightOffSpecialEvent(dataValue) {
  if (dataValue === false) {
    return ["special-event-off"];
  } else {
    return ["special-event"];
  }
}

function checkLightOffRecurringEvent(dataValue) {
  if (dataValue === false) {
    return ["recurring-event-off"];
  } else {
    return ["recurring-event"];
  }
}

async function getRecurringEvents() {
  const response = await fetch(urlReccuringEvents, {
    method: "GET",
    headers: {
      mode: "cors",
      Authorization: "Basic " + encodedAuthString,
    },
  });
  const data = await response.json();

  const events = data.map((eventData) => {
    return {
      type: "recurring",
      daysOfWeek: [dayOfWeekMap[eventData.day.toLowerCase()]],
      startTime: eventData.startTime,
      endTime: eventData.endTime,
      id: eventData.id,
      light: checkDataValue(eventData.dataValue),
      dataValue: eventData.dataValue,
      color: "rgba(155,255,130,0.8)",
      className: checkLightOffRecurringEvent(eventData.dataValue),
      textColor: "black",
    };
  });
  return events;
}

async function getSpecialEvents() {
  const response = await fetch(urlSpecialEvents, {
    method: "GET",
    headers: {
      mode: "cors",
      Authorization: "Basic " + encodedAuthString,
    },
  });
  const data = await response.json();

  const events = data.map((eventData) => {
    return {
      type: "special",
      title: eventData.name,
      start: eventData.startDate,
      end: eventData.endDate,
      id: eventData.id,
      light: checkDataValue(eventData.dataValue),
      dataValue: eventData.dataValue,
      color: "rgba(174, 245, 39, 0.8)",
      textColor: "black",
      className: checkLightOffSpecialEvent(eventData.dataValue),
    };
  });
  return events;
}

async function addSpecialEvent(event) {
  console.log(JSON.stringify(event));
  const response = await fetch(urlSpecialEvents, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + encodedAuthString,
    },
    body: event,
  });
  const data = await response.json();
  return data;
}

async function deleteSpecialEvent(eventId) {
  const response = await fetch(`${urlSpecialEvents}/${eventId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + encodedAuthString,
    },
  });
  const data = await response.json();
  return data;
}

export {
  getRecurringEvents,
  getSpecialEvents,
  addSpecialEvent,
  deleteSpecialEvent,
};
