import React, { Component } from "react";
import styled from "styled-components";
import { isCellValid } from "../utils/validate";
// import { solution } from "../utils/solver";

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

class Main extends Component {
  state = {
    mode: 0,
    possibleNumbers: [],
    board: [],
    completedBoard: [],
    startGame: false,
  };

  startNewGame = async (e) => {
    e.preventDefault();
    const board = await this.createRandomBoard();
    this.setState({
      startGame: true,
      possibleNumbers: this.createButtons(),
      completedBoard: board,
    });
    this.removeCells(this.state.mode, 12);
  };

  modeHandler = (e) => {
    e.preventDefault();
    const selectValue = document.getElementById("mode");
    this.setState({ mode: parseInt(selectValue.value) });
  };

  createButtons = () => {
    const nrOfPossibilities = [];
    for (let i = 1; i <= this.state.mode; i++) {
      nrOfPossibilities.push(i);
    }
    return nrOfPossibilities;
  };

  // END GAME

  endGame = () => {
    this.setState({
      mode: 0,
      startGame: false,
      board: [],
      possibleNumbers: [],
    });
  };

  getIndex = (row, col) => {
    console.log("test:" + row + col);
  };

  createFirstRow = (num) => {
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

  nextCell = (grid) => {
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (grid[r][c] === 0) {
          return [r, c];
        }
      }
    }
    return ["done"];
  };
  solution = (grid) => {
    let copiedArray = [...grid];
    let empty = this.nextCell(copiedArray);
    const row = empty[0];
    const col = empty[1];
    if (row === "done") return;
    for (let i = 1; i <= 4; i++) {
      if (isCellValid(copiedArray, row, col, i)) {
        copiedArray[row][col] = i;
        this.solution(copiedArray);
      }
    }
    if (this.nextCell(copiedArray)[0] !== "done") copiedArray[row][col] = 0;
    // console.log(grid);
    return copiedArray;
  };

  copyAnArray = (array) => {
    const copy = [];
    array.forEach((item) => {
      if (Array.isArray(item)) {
        copy.push(item);
      } else return copy;
    });
  };

  removeCells = (gameMode, numbersToRemove) => {
    let nums = numbersToRemove;
    const newArray = this.copyAnArray(this.state.board);
    console.log(newArray);
    const helper = (nums) => {
      const randomRow = Math.floor(Math.random() * gameMode);
      const randomCol = Math.floor(Math.random() * gameMode);
      if (nums === 0) return;
      nums--;
      // if (removedCells[randomRow][randomCol] !== 0) {
      //   removedCells = [
      //     ...newArray.slice([0, 0], [randomRow, randomCol]),
      //     newArray[randomRow][randomCol],
      //     ...newArray.slice([randomRow + 1], [randomCol + 1]),
      //   ];
      //   nums--;
      // }
      helper(nums);
    };
    helper(nums);
  };

  createRandomBoard = async () => {
    let newBoard = [];
    const firstRow = this.createFirstRow(this.state.mode);
    const helper = () => {
      if (newBoard.length === this.state.mode) return;
      if (newBoard.length < 1) newBoard.push(firstRow);
      newBoard.push(new Array(4).fill(0));
      helper();
    };
    helper();
    this.solution(newBoard);
    return newBoard;
    // removeCells(mode, newBoard, 12);
  };

  render() {
    const gameboard = this.state.board.map((item, rowIndex) => (
      <Row key={rowIndex}>
        {item.map((cell, colIndex) => (
          <Cell
            onClick={() => this.getIndex(rowIndex, colIndex)}
            key={colIndex}
          >
            {cell === 0 ? "" : cell}
          </Cell>
        ))}
      </Row>
    ));

    const gameNumbers = this.state.possibleNumbers.map((item, index) => (
      <Cell key={index}>{item}</Cell>
    ));
    return (
      <Cell>
        <StyledMainWrapper>
          <div>
            <button
              onClick={() => {
                this.endGame();
              }}
            >
              Close
            </button>
          </div>

          {this.state.startGame ? (
            <StyledGameBoard>{gameboard}</StyledGameBoard>
          ) : (
            <StyledNewgameScreen>
              <h1>New game</h1>
              <form
                onSubmit={(e) => {
                  this.startNewGame(e);
                }}
              >
                <select
                  name="mode"
                  id="mode"
                  value={this.state.mode}
                  onChange={(e) => {
                    this.modeHandler(e);
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
                this.createRandomBoard();
              }}
            >
              Randomize
            </button>
            <button onClick={() => {}}>Solve</button>
          </StyledGameNumbers>
        </StyledMainWrapper>
      </Cell>
    );
  }
}

export default Main;
