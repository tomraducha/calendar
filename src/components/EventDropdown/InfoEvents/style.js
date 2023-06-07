import styled from "@emotion/styled";

export const StyledCardContent = styled.div`
  padding: 4px;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  border: 2px solid RGB(59, 95, 134);
  border-radius: 5px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  color: RGB(59, 95, 134);
  font-weight: bold;
  font-size: 1.3rem;
  &:hover {
    background-color: RGB(59, 95, 134);
    color: white;
`;

export const StyledTypography = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  color: #ffffff;
  padding-top: 150px;
  padding-bottom: 10px;
  text-align: center;
`;
