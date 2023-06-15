/* BTIB */
import Calendar from "../components/Calendar/Calendar";
import MenuEvents from "../components/MenuEvents/MenuEvents";
import Title from "../components/Title/Title";
import { getRecurringEvents, getSpecialEvents } from "../components/utilsApi";
/* Libs & plugins */
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";

function Home() {
  //utiliser useContext
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents();
  }, []);

  function getEvents() {
    //gestion erreur
    Promise.all([getRecurringEvents(), getSpecialEvents()]).then(
      ([recurringEvents, specialEvents]) => {
        setEvents([...recurringEvents, ...specialEvents]);
      }
    );
  }

  ////////////////////////////////////////////////////////////////
  // JSX
  ////////////////////////////////////////////////////////////////

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

export default Home;
