import { Card } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { CloseIconButton, StyledCardContent, StyledTypography } from "./style";
import PropTypes from "prop-types";
import { deleteSpecialEvent } from "../../utilsApi";

function InfoEvents({ events }) {
  const options = events
    .filter((event) => event.title)
    .map((event) => ({
      label: event.title,
      id: event.id,
    }));

  function handleDelete(eventId) {
    deleteSpecialEvent(eventId);
  }

  return (
    <>
      <StyledTypography>Infos events</StyledTypography>
      {options.map((option, index) => (
        <Card key={index}>
          <StyledCardContent>
            {option.label}
            <CloseIconButton edge="end" aria-label="delete">
              <CloseIcon onClick={() => handleDelete(option.id)} />
            </CloseIconButton>
          </StyledCardContent>
        </Card>
      ))}
    </>
  );
}

InfoEvents.propTypes = {
  events: PropTypes.array,
};

export default InfoEvents;
