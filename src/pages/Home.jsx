import { Grid } from "@mui/material";
import Calendar from "../components/Calendar";
import EventDropdown from "../components/EventDropdown";
import Title from "../components/Title";

function Home() {
  return (
    <div className="home">
      <Title />
      <Grid container spacing={2}>
        <Grid item xs={1}>
          <EventDropdown />
        </Grid>
        <Grid item xs={11}>
          <Calendar />
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
