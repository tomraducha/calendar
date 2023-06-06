import { Grid } from "@mui/material";
import EventDropdown from "../components/EventDropdown/EventDropdown";
import Title from "../components/Title/Title";
import Calendar from "../components/Calendar/Calendar";
import { useEffect, useState } from "react";
import {
  getRecurringEvents,
  getSpecialEvents,
} from "../components/Calendar/utilsApi";

function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    Promise.all([getRecurringEvents(), getSpecialEvents()]).then(
      ([recurringEvents, specialEvents]) => {
        setEvents([...recurringEvents, ...specialEvents]);
      }
    );
  }, []);
  return (
    <div className="home">
      <Grid className="grid-background">
        <Title />
      </Grid>
      <Grid container spacing={2} className="grid-container">
        <Grid item xs={2} className="grid-background">
          <EventDropdown events={events} />
        </Grid>
        <Grid item xs={10}>
          <Calendar events={events} setEvents={setEvents} />
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
