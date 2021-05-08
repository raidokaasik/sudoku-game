import React from "react";
import styled from "styled-components";

const StyledCell = styled.div`
  cursor: pointer;
  border-radius: 3px;
  border: solid 1px #d3d8db;
  margin: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  font-weight: 600;
  font-size: 1.4rem;
  width: 60px;
  height: 60px;
  color: #576063;
  background: #fff;
  &:hover {
    background: #d7eef7;
  }
  @media (max-width: 860px) {
    font-size: ${(props) => (props.mode === 4 ? "2.2rem" : "1.4rem")};
    width: ${(props) => (props.mode === 9 ? "60px" : "100px")};
    height: ${(props) => (props.mode === 9 ? "60px" : "100px")};
  }
  @media (max-width: 630px) {
    width: ${(props) => (props.mode === 9 ? "50px" : "80px")};
    height: ${(props) => (props.mode === 9 ? "50px" : "80px")};
  }
`;

const StyledGameNumbers = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  @media (max-width: 860px) {
  }
  @media (max-width: 630px) {
    bottom: 150px;
    padding: 0;
  }
`;

const GameNumbers = ({ possibleNumbers, onClick, gameMode }) => {
  const gameNumbers = possibleNumbers.map((item, index) => (
    <StyledCell
      mode={gameMode}
      onClick={() => {
        onClick(item);
      }}
      key={index}
    >
      {item}
    </StyledCell>
  ));
  return <StyledGameNumbers>{gameNumbers}</StyledGameNumbers>;
};

export default GameNumbers;
