import { Grid } from "@mui/material";
import Calendar from "../components/Calendar";
import EventDropdown from "../components/EventDropdown";
import Title from "../components/Title";

function Home() {
  return (
    <div className="home">
      <Grid
        style={{
          backgroundColor: "#364e68",
          opacity: "0.7",
          borderRadius: "10px",
          boxShadow: "0 0 5px 0 rgba(0, 0, 0, 0.9)",
        }}
      >
        <Title />
      </Grid>
      <Grid container spacing={2}>
        <Grid
          item
          xs={2}
          style={{
            backgroundColor: "#364e68",
            opacity: "0.7",
            borderRadius: "10px",
            boxShadow: "0 0 5px 0 rgba(0, 0, 0, 0.9)",
          }}
        >
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
