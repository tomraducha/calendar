import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function App() {
  const events = [
    {
      title: "Ceci est un test",
      start: new Date(),
    },
  ];

  function renderEventContent(eventInfo) {
    return (
      <Card sx={{ borderRadius: 2 }}>
        <CardContent
          sx={{
            p: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
          style={{ backgroundColor: "#364e68", color: "white" }}
        >
          <Typography color="white" gutterBottom variant="h6">
            {eventInfo.timeText}
          </Typography>
          <Typography color="white" gutterBottom variant="h6">
            {eventInfo.event.title}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="App">
      <h1>Calendar</h1>
      <div className="full-calendar">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          weekends={true}
          events={events}
          eventContent={renderEventContent}
          dayMaxEvents={true}
          // editable={true}
          // selectable={true}
          // selectMirror={true}
        />
      </div>
    </div>
  );
}

export default App;
