/* BTIB */
import Calendar from "../components/Calendar/Calendar";
import MenuEvents from "../components/MenuEvents/MenuEvents";
import Title from "../components/Title/Title";
import { getRecurringEvents, getSpecialEvents } from "../components/utilsApi";
import Context from "./Context";
/* Libs & plugins */
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";

function Home() {
  //utiliser useContext
  const [events, setEvents] = useState([]);
  console.log("🚀 ~ file: Home.jsx:14 ~ Home ~ events:", events);

  useEffect(() => {
    getEvents();
  }, []);

  ////////////////////////////////////////////////////////////////
  // Methods
  ////////////////////////////////////////////////////////////////

  async function getEvents() {
    try {
      const [recurringEvents, specialEvents] = await Promise.all([
        getRecurringEvents(),
        getSpecialEvents(),
      ]);
      setEvents([...recurringEvents, ...specialEvents]);
    } catch (error) {
      console.error("Error while retrieving events: ", error);
    }
  }

  ////////////////////////////////////////////////////////////////
  // JSX
  ////////////////////////////////////////////////////////////////

  return (
    <Context.Provider value={{ events, setEvents, getEvents }}>
      <div className="home">
        <Grid className="grid-background">
          <Title />
        </Grid>
        <Grid container spacing={2} className="grid-container">
          <Grid item xs={2} className="grid-background">
            <MenuEvents />
          </Grid>
          <Grid item xs={10}>
            <Calendar />
          </Grid>
        </Grid>
      </div>
    </Context.Provider>
  );
}

export default Home;
