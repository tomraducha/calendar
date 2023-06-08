import Select from "react-select";
import PropTypes from "prop-types";
import { StyledTypography } from "../InfoEvents/style";
function EventDropdown({ events }) {
  const options = events
    .filter((event) => event.title)
    .map((event) => ({
      value: event.id,
      label: event.title,
    }));

  return (
    <>
      <StyledTypography>Favoris</StyledTypography>
      <Select
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: state.isFocused ? "grey" : "white",
            padding: "0.1rem",
            margin: "0.4rem",
          }),
        }}
        options={options}
        components={{
          Option: ({ data, innerRef, innerProps }) => {
            return (
              <div
                id={data.value}
                ref={innerRef}
                {...innerProps}
                className="fc-event fc-h-event"
                style={{ cursor: "move" }}
              >
                {data.label}
              </div>
            );
          },
        }}
      />
    </>
  );
}

EventDropdown.propTypes = {
  data: PropTypes.array,
  events: PropTypes.array,
  innerRef: PropTypes.func,
  innerProps: PropTypes.object,
};

export default EventDropdown;
