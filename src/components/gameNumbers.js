import React from "react";
import { device } from "../theme/devices";
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
  font-size: ${(props) => (props.mode === 4 ? "1.6rem" : "1.4rem")};
  width: ${(props) => (props.mode === 9 ? "60px" : "70px")};
  height: ${(props) => (props.mode === 9 ? "60px" : "70px")};
  color: #576063;
  background: #fff;
  &:hover {
    background: #d7eef7;
  }
  @media ${device.laptopL} {
    font-size: ${(props) => (props.mode === 4 ? "2rem" : "1.4rem")};
    width: ${(props) => (props.mode === 9 ? "45px" : "70px")};
    height: ${(props) => (props.mode === 9 ? "45px" : "70px")};
  }
  @media ${device.tablet} {
    font-size: ${(props) => (props.mode === 4 ? "2rem" : "1.4rem")};
    width: ${(props) => (props.mode === 9 ? "45px" : "80px")};
    height: ${(props) => (props.mode === 9 ? "45px" : "80px")};
  }
  @media ${device.mobileL} {
    font-size: ${(props) => (props.mode === 4 ? "1.8rem" : "1.2rem")};
    width: ${(props) => (props.mode === 9 ? "40px" : "75px")};
    height: ${(props) => (props.mode === 9 ? "40px" : "75px")};
  }

  @media ${device.mobileM} {
    font-size: ${(props) => (props.mode === 4 ? "1.8rem" : "1.1rem")};
    width: ${(props) => (props.mode === 9 ? "35px" : "65px")};
    height: ${(props) => (props.mode === 9 ? "35px" : "65px")};
  }
`;

const StyledGameNumbers = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;

  @media ${device.laptopL} {
    margin-top: 3px;
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
