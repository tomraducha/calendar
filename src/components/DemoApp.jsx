import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction"; // Importation correcte

class DemoApp extends React.Component {
  handleDrop = (arg) => {
    // gère le drop d'un événement externe
    if (confirm(`Voulez-vous ajouter un événement à ${arg.dateStr}?`)) {
      const event = {
        title: arg.draggedEl.innerText, // obtient le titre de l'élément déplacé
        start: arg.date, // obtient la date de l'élément déplacé
        allDay: arg.allDay,
      };
      arg.view.calendar.addEvent(event); // ajoute l'événement au calendrier
    }
  };

  componentDidMount() {
    let draggableEl = document.getElementById("external-events");
    new Draggable(draggableEl, {
      // Utilisation de la classe Draggable
      itemSelector: ".fc-event",
      eventData: function (eventEl) {
        return {
          title: eventEl.innerText,
        };
      },
    });
  }

  render() {
    return (
      <div>
        <div id="external-events">
          <p>Glissez et déposez des événements dans le calendrier</p>
          <div className="fc-event">Mon premier événement</div>
          <div className="fc-event">Mon deuxième événement</div>
          <div className="fc-event">Mon troisième événement</div>
        </div>
        <div id="calendar">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            editable={true}
            droppable={true} // permet le drop d'événements externes
            drop={this.handleDrop} // gère le drop d'un événement externe
          />
        </div>
      </div>
    );
  }
}

export default DemoApp;
