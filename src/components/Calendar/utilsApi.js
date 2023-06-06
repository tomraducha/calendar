const username = import.meta.env.VITE_USERNAME;
const password = import.meta.env.VITE_PASSWORD;
const authString = username + ":" + password;
const encodedAuthString = btoa(authString);

// Convert the day into a number (0 = Sunday, 1 = Monday, etc.)
const dayOfWeekMap = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};

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
      color: "rgba(155,255,130,1)",
      className: ["recurring-event"],
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
      color: "rgba(255,0,0,1)",
      textColor: "black",
      className: ["special-event"],
    };
  });
  return events;
}

export { getRecurringEvents, getSpecialEvents };
