import { Card, Tooltip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { CloseIconButton, StyledCardContent, StyledTypography } from "./style";
import PropTypes from "prop-types";
import { deleteSpecialEvent } from "../../utilsApi";

function InfoEvents({ events, needUpdate }) {
  const options = events
    .filter((event) => event.title)
    .map((event) => ({
      label: event.title,
      id: event.id,
    }));

  function handleDelete(eventId) {
    deleteSpecialEvent(eventId);
    needUpdate();
  }

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

InfoEvents.propTypes = {
  events: PropTypes.array,
  needUpdate: PropTypes.func,
};

export default InfoEvents;
