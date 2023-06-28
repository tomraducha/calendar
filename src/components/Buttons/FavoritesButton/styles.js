/* Libs & plugins */
import styled from "@emotion/styled";
import { IconButton as MuiIconButton } from "@mui/material";

export const Root = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const StyledIconButton = styled(MuiIconButton)`
  color: ${(props) => props.theme.palette.primary.main};
  font-size: 2rem;
`;

export const StyledTypography = styled.div`
  margin-right: 10px;
  color: ${(props) => props.theme.palette.primary.main};
  font-weight: bold;
`;
