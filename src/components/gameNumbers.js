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
  @media (max-width: 630px) {
    width: 50px;
    height: 50px;
  }
`;

const StyledGameNumbers = styled.div`
  position: absolute;
  bottom: 70px;
  /* left: 0; */
  /* margin: 10px 0 0 0; */
  display: flex;
  flex-direction: row;
  @media (max-width: 860px) {
  }
  @media (max-width: 630px) {
    bottom: 150px;
    padding: 0;
  }
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
