import React from "react";
import Button from "./button";
import { device } from "../theme/devices";
import styled from "styled-components";

const StyledWrapper = styled.div`
  /* position: absolute;
  top: 230px;
  right: 0; */
  display: flex;
  flex-direction: column;
  gap: 5px;
  @media ${device.laptopL} {
    top: 280px;
  }
  @media ${device.tablet} {
    position: relative;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    top: 0;
  }
`;

const ControlPanel = ({
  resetGame,
  showSolution,
  checkSolution,
  setNewNumber,
  toggleSolution,
}) => {
  return (
    <StyledWrapper>
      <Button type="regular" name={"Reset"} onClick={resetGame} />
      <Button type="regular" name={"Check"} onClick={checkSolution} />
      <Button type="regular" name={"Erase"} onClick={setNewNumber} />
      <Button
        type="toggle"
        selected={toggleSolution}
        name={"Solution"}
        onClick={showSolution}
      />
    </StyledWrapper>
  );
};

export default ControlPanel;
