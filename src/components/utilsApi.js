import axios from "axios";

const username = import.meta.env.VITE_USERNAME;
const password = import.meta.env.VITE_PASSWORD;
const url = import.meta.env.VITE_BASE_URL;
const scheduleId = import.meta.env.VITE_SCHEDULE_ID;
const authString = `${username}:${password}`;
const encodedAuthString = btoa(authString);

const config = {
  headers: { Authorization: `Basic ${encodedAuthString}` },
};

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
  return dataValue ? "LightOn" : "LightOff";
}

function checkLightOffSpecialEvent(dataValue) {
  return dataValue ? ["special-event"] : ["special-event-off"];
}

function checkLightOffRecurringEvent(dataValue) {
  return dataValue ? ["recurring-event"] : ["recurring-event-off"];
}

async function getRecurringEvents() {
  try {
    const response = await axios.get(urlReccuringEvents, config);
    const data = response.data;

    const events = data.map((eventData) => ({
      type: "recurring",
      id: eventData.id,
      daysOfWeek: [dayOfWeekMap[eventData.day.toLowerCase()]],
      startTime: eventData.startTime,
      endTime: eventData.endTime,
      light: checkDataValue(eventData.dataValue),
      dataValue: eventData.dataValue,
      color: "rgba(155,255,130,0.8)",
      className: checkLightOffRecurringEvent(eventData.dataValue),
      textColor: "black",
    }));

    return events;
  } catch (error) {
    console.error("Error while fetching recurring events: ", error);
  }
}

async function getNameSpecialEvents() {
  try {
    const response = await axios.get(urlSpecialEvents, config);
    const data = response.data;
    console.log("Data from special events: ", data);
    return data;
  } catch (error) {
    console.error("Error while fetching special events: ", error);
  }
}

async function getTimeWindowsSpecialEvents(specialEvents) {
  const dataSpecialEvent = [];

  for (const event of specialEvents) {
    try {
      const response = await axios.get(
        `${urlSpecialEvents}/${event.name}/timeWindows`,
        config
      );
      const data = response.data;

      const value = data.map((data) => ({
        type: "special",
        id: data.id,
        eventName: event.name,
        startTime: data.startTime,
        endTime: data.endTime,
        light: checkDataValue(data.dataValue),
        dataValue: data.dataValue,
        color: "rgba(174, 245, 39, 0.8)",
        textColor: "black",
        className: checkLightOffSpecialEvent(data.dataValue),
      }));

      console.log("Time windows for special event: ", value);
      dataSpecialEvent.push(...value);
    } catch (error) {
      console.error(
        "Error while fetching time windows for special events: ",
        error
      );
    }
  }

  return dataSpecialEvent;
}

async function addSpecialEvent(event) {
  try {
    const response = await axios.post(urlSpecialEvents, event, config);
    return response.data;
  } catch (error) {
    console.error("Error while adding special event: ", error);
  }
}

async function deleteSpecialEvent(eventId) {
  try {
    const response = await axios.delete(
      `${urlSpecialEvents}/${eventId}`,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error while deleting special event: ", error);
  }
}

async function updateSpecialEvent(eventId, event) {
  try {
    const response = await axios.put(
      `${urlSpecialEvents}/${eventId}`,
      event,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error while updating special event: ", error);
  }
}

export {
  getRecurringEvents,
  addSpecialEvent,
  deleteSpecialEvent,
  updateSpecialEvent,
  getNameSpecialEvents,
  getTimeWindowsSpecialEvents,
};
