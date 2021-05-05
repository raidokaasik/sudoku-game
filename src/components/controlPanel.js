import React from "react";
import Button from "./button";
import styled from "styled-components";

const StyledWrapper = styled.div`
  position: absolute;
  top: 70px;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ControlPanel = ({
  resetGame,
  showSolution,
  checkSolution,
  setNewNumber,
}) => {
  return (
    <StyledWrapper>
      <Button name={"Reset"} onClick={resetGame} />
      <Button name={"Solution"} onClick={showSolution} />
      <Button name={"Check"} onClick={checkSolution} />
      <Button name={"Erase"} onClick={setNewNumber} />
    </StyledWrapper>
  );
};

export default ControlPanel;
