import { Button } from "@mui/material";
import styled from "@emotion/styled";

export const StyledButton = styled(Button)`
  background-color: RGB(59, 95, 134);
  color: #ffffff;
  font-weight: bold;
  &:hover {
    background-color: #ffffff;
    color: RGB(59, 95, 134);
  }
`;

export const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
