/* Libs & plugins */
import styled from "@emotion/styled";
import { TextField as MuiTextField } from "@mui/material";

export const StyledTextField = styled(MuiTextField)`
  & label.Mui-focused {
    color: black;
  }
  & .MuiInput-underline:after {
    border-bottom-color: black;
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: black;
    }
  }
  & .MuiInputBase-input {
    color: black;
  }
`;
