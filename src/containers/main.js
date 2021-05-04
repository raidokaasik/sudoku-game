import React, { useState } from "react";
import styled from "styled-components";
import { solution } from "../utils/solver";

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
  const [mode, setMode] = useState(0);
  const [possibleNumbers, setPossibleNumbers] = useState([]);
  const [board, setBoard] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [startGame, setStartGame] = useState(false);

  const startNewGame = async (e) => {
    setStartGame(true);
    const board = await createRandomBoard();
    removeNumbers(board, 12);
    // removeCells(mode, board, 12);
    setPossibleNumbers(createButtons());
  };

  const modeHandler = (e) => {
    e.preventDefault();
    const selectValue = document.getElementById("mode");
    setMode(parseInt(selectValue.value));
  };

  const createButtons = () => {
    const nrOfPossibilities = [];
    for (let i = 1; i <= mode; i++) {
      nrOfPossibilities.push(i);
    }
    return nrOfPossibilities;
  };

  // END GAME

  const endGame = () => {
    setStartGame(false);
    setMode(0);
    // setTest(testArray);
    setBoard([]);
    setPossibleNumbers([]);
  };

  const getIndex = (row, col) => {
    console.log("test:" + row + col);
  };

  const setSolution = () => {};

  const createFirstRow = (num) => {
    let firstRow = [];
    const helper = () => {
      const random = Math.floor(Math.random() * num) + 1;
      if (firstRow.length === num) return;
      if (firstRow.indexOf(random) === -1) firstRow.push(random);
      helper();
    };
    helper();
    return firstRow;
  };

  const removeNumbers = (board, numbersToRemove) => {
    const newArray = [...board];
    const removedTiles = [];
    const nums = numbersToRemove;
    for (let i = 0; i <= nums; i++) {
      const randomRow = Math.floor(Math.random() * mode);
      const randomCol = Math.floor(Math.random() * mode);
      // if (newArray[randomRow][randomCol] !== 0) {
      //   removedTiles.push((newArray[randomRow][randomCol] = 0));
      // }
    }

    console.log(removedTiles);
  };

  // const removeCells = (gameMode, array, numbersToRemove) => {
  //   let nums = numbersToRemove;
  //   let newArray = [...array];
  //   // let nums = [...numbersToRemove][0];
  //   // let newArray = [...array];
  //   // console.log(newArray);
  //   // console.log(nums);
  //   const helper = (nums) => {
  //     const randomRow = Math.floor(Math.random() * gameMode);
  //     const randomCol = Math.floor(Math.random() * gameMode);
  //     if (nums === 0) return;
  //     if (newArray[randomRow][randomCol] !== 0) {
  //       newArray[randomRow][randomCol] = 0;
  //       nums--;
  //     }
  //     helper(nums);
  //   };
  //   helper(nums);
  //   setBoard(newArray);
  // };

  const createRandomBoard = async () => {
    let newBoard = [];
    const firstRow = createFirstRow(mode);
    const helper = () => {
      if (newBoard.length === mode) return;
      if (newBoard.length < 1) newBoard.push(firstRow);
      newBoard.push(new Array(4).fill(0));
      helper();
    };
    helper();
    setCompleted(newBoard);
    setBoard(newBoard);
    solution(newBoard);
    return newBoard;
    // removeCells(mode, newBoard, 12);
  };

  const gameboard = board.map((item, rowIndex) => (
    <Row key={rowIndex}>
      {item.map((cell, colIndex) => (
        <Cell onClick={() => getIndex(rowIndex, colIndex)} key={colIndex}>
          {cell === 0 ? "" : cell}
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
          <button
            onClick={() => {
              createRandomBoard();
            }}
          >
            Randomize
          </button>
          <button onClick={() => {}}>Solve</button>
        </StyledGameNumbers>
      </StyledMainWrapper>
    </Cell>
  );
};

export default Main;
