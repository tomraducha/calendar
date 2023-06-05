import { Grid } from "@mui/material";
import EventDropdown from "../components/EventDropdown/EventDropdown";
import Title from "../components/Title/Title";
import Calendar from "../components/Calendar/Calendar";

function Home() {
  return (
    <div className="home">
      <Grid className="grid-background">
        <Title />
      </Grid>
      <Grid container spacing={2} className="grid-container">
        <Grid item xs={2} className="grid-background">
          <EventDropdown />
        </Grid>
        <Grid item xs={10}>
          <Calendar />
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
