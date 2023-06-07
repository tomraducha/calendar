import { Card } from "@mui/material";
import { StyledCardContent, StyledTypography } from "./style";
import PropTypes from "prop-types";

function InfoEvents({ events }) {
  const options = events
    .filter((event) => event.title)
    .map((event) => ({
      value: event.id,
      label: event.title,
    }));

  return (
    <>
      <StyledTypography>Infos events</StyledTypography>
      {options.map((option, index) => (
        <Card key={index}>
          <StyledCardContent>{option.label}</StyledCardContent>
        </Card>
      ))}
    </>
  );
}

InfoEvents.propTypes = {
  events: PropTypes.array,
};

export default InfoEvents;
