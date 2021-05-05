import React from "react";
import Button from "./button";
import styled from "styled-components";

const StyledWrapper = styled.div`
  position: absolute;
  top: 230px;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
  @media (max-width: 860px) {
    position: relative;
    width: 100%;
    flex-direction: row;
    top: 0;
    margin-bottom: 30px;
    padding-left: 15px;
  }
  @media (max-width: 630px) {
    padding: 0;
    width: 100%;
    gap: 15px;
    flex-direction: row;
    top: 0;
    align-items: center;
    justify-content: center;
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
      <Button name={"Reset"} onClick={resetGame} />
      <Button
        selected={toggleSolution}
        name={"Solution"}
        onClick={showSolution}
      />
      <Button name={"Check"} onClick={checkSolution} />
      <Button name={"Erase"} onClick={setNewNumber} />
    </StyledWrapper>
  );
};

export default ControlPanel;
