import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import Title from "../components/Title/Title";
import Calendar from "../components/Calendar/Calendar";
import { useEffect, useState } from "react";
import MenuEvents from "../components/MenuEvents/MenuEvents";
import { getRecurringEvents, getSpecialEvents } from "../components/utilsApi";

function Home() {
  const [events, setEvents] = useState([]);

  async function getEvents() {
    Promise.all([getRecurringEvents(), getSpecialEvents()]).then(
      ([recurringEvents, specialEvents]) => {
        setEvents([...recurringEvents, ...specialEvents]);
      }
    );
  }

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="home">
      <Grid className="grid-background">
        <Title />
      </Grid>
      <Grid container spacing={2} className="grid-container">
        <Grid item xs={2} className="grid-background">
          <MenuEvents
            events={events}
            setEvents={setEvents}
            needUpdate={getEvents}
          />
        </Grid>
        <Grid item xs={10}>
          <Calendar events={events} setEvents={setEvents} />
        </Grid>
      </Grid>
    </div>
  );
}

Home.propTypes = {
  events: PropTypes.array,
  setEvents: PropTypes.func,
};

export default Home;
