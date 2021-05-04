import React, { Component } from "react";
import styled from "styled-components";
import { isCellValid } from "../utils/validate";
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
const StyledCell = styled.div`
  margin: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  width: 40px;
  height: 40px;
  background: ${(props) =>
    props.locked ? "#c6e8f5" : props.active ? "#c6e8f5" : "#ccc"};
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
    lockedCells: [],
    startGame: false,
    solution: false,
    checkSolution: false,
    selected: false,
    selectedIndex: [],
  };

  // START AND RESET GAME
  // start
  startNewGame = async (e) => {
    this.createRandomBoard();
    const board = await this.createRandomBoard();
    this.setState((prev) => ({
      startGame: !prev.startGame,
      possibleNumbers: this.createButtons(),
      completedBoard: prev.completedBoard.concat(board),
    }));
    await this.removeCells(this.state.mode, 12);
  };

  // reset
  resetGame = async () => {
    const board = await this.createRandomBoard();
    this.setState((prev) => ({
      completedBoard: board,
    }));
    await this.removeCells(this.state.mode, 12);
  };

  modeHandler = (e) => {
    e.preventDefault();
    const selectValue = document.getElementById("mode");
    this.setState((prev) => ({
      mode: prev.mode + parseInt(selectValue.value),
    }));
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
    this.setState((prev) => ({
      mode: 0,
      possibleNumbers: [],
      board: [],
      completedBoard: [],
      lockedCells: [],
      startGame: false,
      solution: false,
      checkSolution: false,
      selected: false,
      selectedIndex: [],
    }));
  };

  getIndex = (row, col) => {
    this.setState((prev) => ({ selected: true }));
    const selection = [row, col];
    this.setState((prev) => ({
      selectedIndex: selection,
    }));
  };

  setNewNumber = (value) => {
    let copiedBoard = this.deepCopy(this.state.board);
    const index = this.state.selectedIndex;
    copiedBoard[index[0]][index[1]] = value;
    this.setState({ board: copiedBoard });
  };

  // REMOVE NR OF CELLS
  // Util to create a deep copy of 2D array
  deepCopy = (array) => {
    let copy = [];
    for (let i = 0; i < array.length; i++) {
      copy[i] = array[i].slice();
    }
    return copy;
  };
  // remove cells
  removeCells = async (gameMode, numbersToRemove) => {
    let nums = numbersToRemove;
    let newArray = this.deepCopy(this.state.completedBoard);
    const helper = (nums) => {
      const randomRow = Math.floor(Math.random() * gameMode);
      const randomCol = Math.floor(Math.random() * gameMode);
      if (nums === 0) return;
      if (newArray[randomRow][randomCol] !== 0) {
        newArray[randomRow][randomCol] = 0;
        nums--;
      }
      helper(nums);
    };
    helper(nums);
    this.lockedCellGroup(newArray);
    this.setState({ board: newArray });
  };

  // CREATE RANDOM BOARD & SOLVE IT
  // first row of random INTs
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

  // populate the board along with the first row and solve it.
  createRandomBoard = async () => {
    let newBoard = [];
    const firstRow = this.createFirstRow(this.state.mode);
    const helper = () => {
      if (newBoard.length === this.state.mode) return;
      if (newBoard.length < 1) newBoard.push(firstRow);
      newBoard.push(new Array(this.state.mode).fill(0));
      helper();
    };
    helper();
    solution(newBoard);
    return newBoard;
  };

  // SHOW SOLUTION

  checkSolution = (gameBoard, solution) => {
    for (let r = 0; r < this.state.mode; r++) {
      for (let c = 0; c < this.state.mode; c++) {
        if (gameBoard[r][c] !== solution[r][c]) return console.log("Incorrect");
      }
    }
    return console.log("Correct solution");
  };

  showSolution = () => {
    this.setState((prev) => ({ solution: !prev.solution }));
    // this.setState({ showSolution: true });
  };

  lockedCellGroup = (board) => {
    const lockedCells = [];
    for (let r = 0; r < this.state.mode; r++) {
      for (let c = 0; c < this.state.mode; c++) {
        if (board[r][c] !== 0) {
          lockedCells.push(r.toString() + c.toString());
        }
      }
    }
    this.setState({ lockedCells: lockedCells });
  };

  // disableLockedCell = (row, col) => {
  //   console.log("true: " + row + " " + col);
  //   if (this.state.lockedCells.includes([row, col])) {
  //     console.log("true: " + row + " " + col);
  //   } else {
  //     console.log("false");
  //   }
  // };

  render() {
    const board = this.state.solution
      ? this.state.completedBoard
      : this.state.board;
    const gameboard = board.map((item, rowIndex) => (
      <Row key={rowIndex}>
        {item.map((cell, colIndex) => (
          <StyledCell
            locked={
              this.state.lockedCells.includes(
                rowIndex.toString() + colIndex.toString()
              )
                ? true
                : false
            }
            active={
              rowIndex === this.state.selectedIndex[0] &&
              colIndex === this.state.selectedIndex[1]
                ? true
                : false
            }
            onClick={() => this.getIndex(rowIndex, colIndex)}
            key={colIndex}
          >
            {cell === 0 ? "" : cell}
          </StyledCell>
        ))}
      </Row>
    ));

    const gameNumbers = this.state.possibleNumbers.map((item, index) => (
      <StyledCell
        onClick={() => {
          this.setNewNumber(item);
        }}
        key={index}
      >
        {item}
      </StyledCell>
    ));
    return (
      <>
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
                this.resetGame();
              }}
            >
              Randomize
            </button>
            <button
              onClick={() => {
                this.showSolution();
              }}
            >
              Show solution
            </button>
            <button
              onClick={() => {
                this.checkSolution(this.state.board, this.state.completedBoard);
              }}
            >
              Check
            </button>
          </StyledGameNumbers>
        </StyledMainWrapper>
      </>
    );
  }
}

export default Main;
