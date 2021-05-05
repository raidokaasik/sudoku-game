import React from "react";
import styled from "styled-components";

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledGameBoard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #f5f5f2;
  border: solid 1px #d3d8db;
  height: 600px;
  width: 600px;
  border-radius: 5px;

  @media (max-width: 630px) {
    min-width: 450px;
    min-height: 450px;
    width: auto;
    height: auto;
    padding: 10px;
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
  font-size: 1.4rem;
  min-width: ${(props) => (props.mode === 9 ? "60px" : "60px")};
  min-height: ${(props) => (props.mode === 9 ? "60px" : "60px")};
  color: #576063;
  background: ${(props) =>
    props.locked ? "#fff" : props.active ? "#d7eef7" : "#fff"};
  &:hover {
    background: ${(props) => (props.locked ? "#fff" : "#d7eef7")};
  }
  @media (max-width: 630px) {
    min-width: 50px;
    min-height: 50px;
  }
`;

const GameBoard = ({ board, lockedCell, selectedIndex, onClick, gameMode }) => {
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
    <StyledGameBoard>
      <div>{gameboard}</div>
    </StyledGameBoard>
  );
};

export default GameBoard;
