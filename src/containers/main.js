import React, { Component } from "react";
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
  min-height: 600px;
  min-width: 600px;

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
  min-height: 600px;
  min-width: 600px;
  border-radius: 5px;
`;
const StyledGameNumbers = styled.div`
  margin: 10px 0 0 0;
  display: flex;
  flex-direction: row;
`;
const StyledCell = styled.div`
  border-radius: 3px;
  border: solid 1px #d3d8db;

  /* border: solid 1px #d3d8db;
  border-top: solid 1px
    ${(props) => (props.rowindex % 2 === 0 ? "#242424" : "#d3d8db")};
  border-bottom: solid 1px
    ${(props) => (props.rowindex === 3 ? "#242424" : "#d3d8db")};
  border-left: 1px solid
    ${(props) => (props.colindex % 2 === 0 ? "#242424" : "#d3d8db")};
  border-right: 1px solid
    ${(props) => (props.colindex === 3 ? "#242424" : "#d3d8db")}; */

  margin: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  font-weight: 600;
  font-size: 1.4rem;
  min-width: 60px;
  min-height: 60px;
  color: #333a3d;
  background: ${(props) =>
    props.locked ? "#f5f5f2" : props.active ? "#c6e8f5" : "#f5f5f2"};
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
    e.preventDefault();
    if (this.state.mode !== 0) {
      const board = await this.createRandomBoard();
      this.setState((prev) => ({
        startGame: !prev.startGame,
        possibleNumbers: this.createButtons(),
        completedBoard: board,
      }));
      const numbersToRemove = this.state.mode === 4 ? 11 : 64;
      await this.removeCells(this.state.mode, numbersToRemove);
    } else {
      console.log("Mode must be selected");
    }
  };

  // reset
  resetGame = async () => {
    const board = await this.createRandomBoard();
    this.setState((prev) => ({
      completedBoard: board,
    }));
    const numbersToRemove = this.state.mode === 4 ? 11 : 64;
    await this.removeCells(this.state.mode, numbersToRemove);
  };

  modeHandler = (e) => {
    e.preventDefault();
    const selectValue = document.getElementById("mode");
    this.setState((prev) => ({
      mode: parseInt(selectValue.value),
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
    solution(newBoard, this.state.mode);
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

  endGame = () => {
    this.setState(() => ({
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

  render() {
    const board = this.state.solution
      ? this.state.completedBoard
      : this.state.board;
    const gameboard = board.map((item, rowIndex) => (
      <Row key={rowIndex}>
        {item.map((cell, colIndex) => (
          <StyledCell
            rowindex={rowIndex}
            colIndex={colIndex}
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
              Reset
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
            <button
              onClick={() => {
                this.setNewNumber(0);
              }}
            >
              Erase
            </button>
          </StyledGameNumbers>
        </StyledMainWrapper>
      </>
    );
  }
}

export default Main;
