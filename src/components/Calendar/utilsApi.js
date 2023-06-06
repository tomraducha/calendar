const username = import.meta.env.VITE_USERNAME;
const password = import.meta.env.VITE_PASSWORD;
const authString = username + ":" + password;
const encodedAuthString = btoa(authString);

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
  const response = await fetch(
    "https://192.168.6.125:443/v2/schedule/N0TgJscHAN5X6f96TkjqO/recurringEvents",
    {
      method: "GET",
      headers: {
        mode: "cors",
        Authorization: "Basic " + encodedAuthString,
      },
    }
  );
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
  const response = await fetch(
    "https://192.168.6.125:443/v2/schedule/N0TgJscHAN5X6f96TkjqO/specialEvents",
    {
      method: "GET",
      headers: {
        mode: "cors",
        Authorization: "Basic " + encodedAuthString,
      },
    }
  );
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

export { getRecurringEvents, getSpecialEvents };
