import axios from "axios";

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
  try {
    const response = await axios.get(urlReccuringEvents, {
      headers: {
        Authorization: "Basic " + encodedAuthString,
      },
    });

    const events = response.data.map((eventData) => {
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
  } catch (error) {
    console.error("Error when retrieving recurring events: ", error);
  }
}

async function getSpecialEvents() {
  try {
    const response = await axios.get(urlSpecialEvents, {
      headers: {
        Authorization: "Basic " + encodedAuthString,
      },
    });

    const events = response.data.map((eventData) => {
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
  } catch (error) {
    console.error("Error when retrieving special events: ", error);
  }
}

async function addSpecialEvent(event) {
  try {
    const response = await axios.post(urlSpecialEvents, event, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + encodedAuthString,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error when adding a special event: ", error);
  }
}

async function deleteSpecialEvent(eventId) {
  try {
    const response = await axios.delete(`${urlSpecialEvents}/${eventId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + encodedAuthString,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error when deleting a special event: ", error);
  }
}

async function updateSpecialEvent(eventId, event) {
  try {
    const response = await axios.put(`${urlSpecialEvents}/${eventId}`, event, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + encodedAuthString,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error updating a special event: ", error);
  }
}

export {
  getRecurringEvents,
  getSpecialEvents,
  addSpecialEvent,
  deleteSpecialEvent,
  updateSpecialEvent,
};
