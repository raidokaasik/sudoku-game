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
  min-width: 60px;
  min-height: 60px;
  color: #576063;
  background: #fff;
  &:hover {
    background: #d7eef7;
  }
`;

const StyledGameNumbers = styled.div`
  position: absolute;
  top: 630px;
  /* left: 0; */
  /* margin: 10px 0 0 0; */
  display: flex;
  flex-direction: row;
`;

const GameNumbers = ({ possibleNumbers, onClick }) => {
  const gameNumbers = possibleNumbers.map((item, index) => (
    <StyledCell
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
