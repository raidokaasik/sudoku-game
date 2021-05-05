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
    width: 100%;
    flex-direction: row;
    top: 60px;
    padding-left: 15px;
  }
  @media (max-width: 630px) {
    padding: 0;
    width: 100%;
    gap: 15px;
    flex-direction: row;
    top: 140px;
    align-items: center;
    justify-content: center;
  }
`;
const StyledCheckSolutionContainer = styled.div`
  margin: 10px 0 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  flex-direction: column;
  color: ${(props) => (props.isValid ? "limegreen" : "tomato")};
  i {
    font-size: 1.5rem;
  }
  p {
    font-size: 1.2rem;
  }
  @media (max-width: 630px) {
    position: absolute;
    width: 100%;
    top: 0px;
    gap: 15px;
    flex-direction: row;
    top: 140px;
    align-items: center;
    justify-content: center;
  }
`;

const ControlPanel = ({
  resetGame,
  showSolution,
  checkSolution,
  setNewNumber,
  isSolutionValid,
  toggleSolution,
}) => {
  const correct = (
    <>
      <i className="fas fa-check"></i>
      <p>Correct</p>
    </>
  );
  const inCorrect = (
    <>
      <i className="fas fa-times"></i>
      <p>Incorrect</p>
    </>
  );
  const isvalid =
    isSolutionValid === true
      ? correct
      : isSolutionValid === false
      ? inCorrect
      : null;
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
