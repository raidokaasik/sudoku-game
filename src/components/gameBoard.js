import React from "react";
import styled from "styled-components";
import { device } from "../theme/devices";

import GameNumbers from "./gameNumbers";

// const useStyles = makeStyles((theme) => ({
//   row: {
//     display: "flex",
//     flexDirection: "row",
//   },
//   styledGameBoardWrapper: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     flexDirection: "column",
//   },
//   styledGameBoard: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     flexDirection: "column",
//     background: "#a1adc2",
//     border: "solid 1px #d3d8db",
//     height: (gameMode) => (gameMode === 4 ? "500px" : "600px"),
//     width: (gameMode) => (gameMode === 4 ? "500px" : "600px"),
//     borderRadius: "5px",
//     [theme.breakpoints.down(theme.breakpoints.values.laptopL)]: {
//       padding: (gameMode) => (gameMode === 4 ? "40px" : "20px"),
//       minWidth: "320px",
//       minHeight: "320px",
//       width: "auto",
//       height: "auto",
//     },
//   },
// }));

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;
const StyledGameBoardWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const StyledGameBoard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #a1adc2;
  border: solid 1px #d3d8db;
  height: ${(props) => (props.mode === 4 ? "500px" : "600px")};
  width: ${(props) => (props.mode === 4 ? "500px" : "600px")};
  border-radius: 5px;

  @media ${device.laptopL} {
    padding: ${(props) => (props.mode === 4 ? "40px" : "20px")};
    min-width: 320px;
    min-height: 320px;
    width: auto;
    height: auto;
  }

  @media ${device.tablet} {
    padding: ${(props) => (props.mode === 4 ? "45px" : "20px")};
  }

  @media ${device.mobileL} {
    padding: ${(props) => (props.mode === 4 ? "25px" : "10px")};
  }
  @media ${device.mobileM} {
    padding: ${(props) => (props.mode === 4 ? "15px" : "5px")};
  }
`;

const StyledCell = styled.div`
  cursor: ${(props) => (props.locked ? "unset" : "pointer")};
  border-top-left-radius: ${(props) =>
    props.colindex === 0 && props.rowindex === 0 && "5px"};
  border-top-right-radius: ${(props) =>
    props.colindex === props.board.length - 1 && props.rowindex === 0 && "5px"};
  border-bottom-left-radius: ${(props) =>
    props.colindex === 0 && props.rowindex === props.board.length - 1 && "5px"};
  border-bottom-right-radius: ${(props) =>
    props.colindex === props.board.length - 1 &&
    props.rowindex === props.board.length - 1 &&
    "5px"};
  border-bottom: solid 1px
    ${(props) => {
      if (props.mode === 4) {
        return props.rowindex === 1 ? "#9da7ab" : "#d3d8db";
      } else if (props.mode === 9) {
        return props.rowindex === 2
          ? "#9da7ab"
          : props.rowindex === 5
          ? "#9da7ab"
          : "#d3d8db";
      }
    }};

  border-right: 1px solid
    ${(props) => {
      if (props.mode === 4) {
        return props.colindex === 1 ? "#9da7ab" : "#d3d8db";
      } else if (props.mode === 9) {
        return props.colindex === 2
          ? "#9da7ab"
          : props.colindex === 5
          ? "#9da7ab"
          : "#d3d8db";
      }
    }};
  border-top: solid 1px
    ${(props) => {
      if (props.mode === 4) {
        return props.rowindex === 2 ? "#9da7ab" : "#d3d8db";
      } else if (props.mode === 9) {
        return props.rowindex === 3
          ? "#9da7ab"
          : props.rowindex === 6
          ? "#9da7ab"
          : "#d3d8db";
      }
    }};
  border-left: 1px solid
    ${(props) => {
      if (props.mode === 4) {
        return props.colindex === 2 ? "#9da7ab" : "#d3d8db";
      } else if (props.mode === 9) {
        return props.colindex === 3
          ? "#9da7ab"
          : props.colindex === 6
          ? "#9da7ab"
          : "#d3d8db";
      }
    }};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  font-weight: 600;
  font-size: ${(props) => (props.mode === 4 ? "2rem" : "1.4rem")};
  min-width: ${(props) => (props.mode === 9 ? "60px" : "70px")};
  min-height: ${(props) => (props.mode === 9 ? "60px" : "70px")};
  color: #576063;
  background: ${(props) =>
    props.locked ? "#f2f2f0" : props.active ? "#d1e5f0" : "#fff"};
  &:hover {
    background: ${(props) => (props.locked ? "#f2f2f0" : "#ebf3f5")};
  }

  @media ${device.laptopL} {
    font-size: ${(props) => (props.mode === 4 ? "2rem" : "1.4rem")};
    min-width: ${(props) => (props.mode === 9 ? "45px" : "70px")};
    min-height: ${(props) => (props.mode === 9 ? "45px" : "70px")};
  }

  @media ${device.tablet} {
    font-size: ${(props) => (props.mode === 4 ? "2rem" : "1.4rem")};
    min-width: ${(props) => (props.mode === 9 ? "45px" : "80px")};
    min-height: ${(props) => (props.mode === 9 ? "45px" : "80px")};
  }

  @media ${device.mobileL} {
    font-size: ${(props) => (props.mode === 4 ? "1.8rem" : "1.2rem")};
    min-width: ${(props) => (props.mode === 9 ? "40px" : "75px")};
    min-height: ${(props) => (props.mode === 9 ? "40px" : "75px")};
  }

  @media ${device.mobileM} {
    font-size: ${(props) => (props.mode === 4 ? "1.8rem" : "1.1rem")};
    min-width: ${(props) => (props.mode === 9 ? "35px" : "65px")};
    min-height: ${(props) => (props.mode === 9 ? "35px" : "65px")};
  }
`;

const GameBoard = ({
  board,
  lockedCell,
  selectedIndex,
  onClick,
  gameMode,
  setNewNumber,
  possibleNumbers,
}) => {
  // const classes = useStyles(gameMode);

  const gameboard = board.map((item, rowIndex) => (
    <Row key={rowIndex}>
      {item.map((cell, colIndex) => (
        <StyledCell
          board={board}
          mode={gameMode}
          rowindex={rowIndex}
          colindex={colIndex}
          locked={
            lockedCell.includes(rowIndex.toString() + colIndex.toString())
              ? true
              : false
          }
          active={
            rowIndex === selectedIndex[0] && colIndex === selectedIndex[1]
              ? true
              : false
          }
          onClick={() => onClick(rowIndex, colIndex)}
          key={colIndex}
        >
          {cell === 0 ? "" : cell}
        </StyledCell>
      ))}
    </Row>
  ));

  return (
    <StyledGameBoardWrapper>
      <StyledGameBoard mode={gameMode}>
        <div>{gameboard}</div>
      </StyledGameBoard>
      <GameNumbers
        gameMode={gameMode}
        possibleNumbers={possibleNumbers}
        onClick={setNewNumber}
      />
    </StyledGameBoardWrapper>
  );
};

export default GameBoard;
