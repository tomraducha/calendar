import { Grid } from "@mui/material";
import Title from "../components/Title/Title";
import Calendar from "../components/Calendar/Calendar";
import { useEffect, useState } from "react";
import {
  getRecurringEvents,
  getSpecialEvents,
} from "../components/Calendar/utilsApi";
import MenuEvents from "../components/MenuEvents/MenuEvents";

function Home() {
  const [events, setEvents] = useState([]);

  function handleCreate() {
    const title = prompt("Veuillez entrer le titre de l'événement");
    if (title) {
      const newEvent = {
        title,
        start: new Date().toISOString(),
        end: new Date().toISOString(),
        id: Date.now().toString(),
      };
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    }
  }

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
          <MenuEvents events={events} onCreate={handleCreate} />
        </Grid>
        <Grid item xs={10}>
          <Calendar events={events} setEvents={setEvents} />
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
