/* BTIB */
import { CloseIconButton, StyledCardContent, StyledTypography } from "./style";
import { deleteSpecialEvent } from "../../utilsApi";
import Context from "../../../pages/Context";
/* Libs & plugins */
import { useContext } from "react";
import { Card, Tooltip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function InfoEvents() {
  const { getEvents } = useContext(Context);
  const { events } = useContext(Context);

  const options = events
    .filter((event) => event.title)
    .map((event) => ({
      label: event.title,
      id: event.id,
    }));

  ////////////////////////////////////////////////////////////////
  // Event handlers
  ////////////////////////////////////////////////////////////////

  function handleDelete(eventId) {
    deleteSpecialEvent(eventId);
    getEvents();
  }

  ////////////////////////////////////////////////////////////////
  // JSX
  ////////////////////////////////////////////////////////////////

  return (
    <>
      <StyledTypography>Special Events</StyledTypography>
      {options.map((option, index) => (
        <Card key={index}>
          <StyledCardContent>
            {option.label.length > 20 ? (
              <Tooltip title={option.label} placement="top-start">
                <span>{option.label.substring(0, 20) + "..."}</span>
              </Tooltip>
            ) : (
              <span>{option.label}</span>
            )}
            <CloseIconButton
              onClick={() => handleDelete(option.id)}
              edge="end"
              aria-label="delete"
            >
              <CloseIcon />
            </CloseIconButton>
          </StyledCardContent>
        </Card>
      ))}
    </>
  );
}

export default InfoEvents;
