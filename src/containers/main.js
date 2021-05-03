import React, { useState } from "react";
import styled from "styled-components";

const StyledMainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledNewgameScreen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fff;
  min-height: 400px;
  min-width: 400px;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledGameBoard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  background: #fff;
  min-height: 400px;
  min-width: 400px;
  border-radius: 5px;
`;
const StyledGameNumbers = styled.div`
  margin: 10px 0 0 0;
  display: flex;
  flex-direction: row;
`;
const Cell = styled.div`
  margin: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  width: 40px;
  height: 40px;
  background: #ccc;
  &:hover {
    background: #c6e8f5;
  }
`;

const Main = () => {
  const testArray = [
    [0, 1, 0, 0],
    [0, 0, 2, 0],
    [3, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  const [mode, setMode] = useState(0);
  const [possibleNumbers, setPossibleNumbers] = useState([]);
  const [board, setBoard] = useState([]);
  const [startGame, setStartGame] = useState(false);
  const [test, setTest] = useState(testArray);

  const startNewGame = async (e) => {
    // e.preventDefault();
    // // const randomValue = Math.floor(Math.random() * mode);
    // const nrOfPossibilities = [];
    // for (let i = 1; i <= mode; i++) {
    //   nrOfPossibilities.push(i);
    // }
    // const board = new Array(mode).fill(new Array(mode).fill(0));
    // setBoard(board);
    setStartGame(true);
    // setPossibleNumbers(nrOfPossibilities);
  };

  const modeHandler = (e) => {
    e.preventDefault();
    const selectValue = document.getElementById("mode");
    setMode(parseInt(selectValue.value));
  };

  // END GAME

  const endGame = () => {
    setStartGame(false);
    setMode(0);
    setTest(testArray);
    setBoard([]);
    setPossibleNumbers([]);
  };

  const getIndex = (row, col) => {
    console.log("test:" + row + col);
  };

  const findCell = () => {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (test[i][j] === 0) {
          console.log([i, j]);
        }
      }
    }
  };

  const validateRows = () => {};

  const gameboard = test.map((item, rowIndex) => (
    <Row key={rowIndex}>
      {item.map((cell, colIndex) => (
        <Cell onClick={() => getIndex(rowIndex, colIndex)} key={colIndex}>
          {cell}
        </Cell>
      ))}
    </Row>
  ));

  const gameNumbers = possibleNumbers.map((item, index) => (
    <Cell key={index}>{item}</Cell>
  ));
  return (
    <Cell>
      <StyledMainWrapper>
        <div>
          <button
            onClick={() => {
              endGame();
            }}
          >
            Close
          </button>
        </div>

        {startGame ? (
          <StyledGameBoard>{gameboard}</StyledGameBoard>
        ) : (
          <StyledNewgameScreen>
            <h1>New game</h1>
            <form
              onSubmit={(e) => {
                startNewGame(e);
              }}
            >
              <select
                name="mode"
                id="mode"
                value={mode}
                onChange={(e) => {
                  modeHandler(e);
                }}
              >
                <option value="-">-</option>
                <option value="4">4</option>
                <option value="9">9</option>
              </select>
              <input type="submit" value="Start" />
            </form>
          </StyledNewgameScreen>
        )}
        <StyledGameNumbers>
          {gameNumbers}
          <button onClick={() => findCell()}>Randomize</button>
          <button
            onClick={() => {
              "";
            }}
          >
            Solve
          </button>
        </StyledGameNumbers>
      </StyledMainWrapper>
    </Cell>
  );
};

export default Main;