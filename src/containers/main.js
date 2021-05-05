import React, { Component } from "react";
import styled from "styled-components";
import { solution } from "../utils/solver";
import GameBoard from "../components/gameBoard";
import GameNumbers from "../components/gameNumbers";
import ControlPanel from "../components/controlPanel";
import StartScreen from "../components/startScreen";
import Button from "../components/button";

const StyledMain = styled.div`
  z-index: 4;
  position: relative;
  width: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 100px;
`;
const StyledMainWrapper = styled.div`
  z-index: 1;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledCloseButtonWrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 25px;
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
    checkSolution: null,
    selected: false,
    selectedIndex: [],
    difficulty: 36,
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
      const numbersToRemove =
        this.state.mode === 4 ? 11 : this.state.difficulty;
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
    const numbersToRemove = this.state.mode === 4 ? 11 : this.state.difficulty;
    await this.removeCells(this.state.mode, numbersToRemove);
  };

  // HANDLE GAME MODE AND DIFFICULTY
  // game mode
  modeHandler = (e) => {
    e.preventDefault();
    const selectValue = document.getElementById("mode");
    this.setState(() => ({
      mode: parseInt(selectValue.value),
    }));
  };

  // difficulty
  difficultyHandler = (e) => {
    e.preventDefault();
    const selectValue = document.getElementById("difficulty");
    this.setState(() => ({
      difficulty: parseInt(selectValue.value),
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
    const index = this.state.selectedIndex;
    if (index.length !== 0) {
      let copiedBoard = this.deepCopy(this.state.board);
      copiedBoard[index[0]][index[1]] = value;
      this.setState({ board: copiedBoard });
    }
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
        if (gameBoard[r][c] !== solution[r][c]) {
          this.setState(() => ({ checkSolution: false }));
          return console.log("Incorrect");
        }
      }
    }
    this.setState(() => ({ checkSolution: true }));
    return console.log("Correct");
  };

  showSolution = () => {
    this.setState((prev) => ({ solution: !prev.solution }));
  };

  // UTILS

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

  deselect = () => {
    this.setState({ selectedIndex: [] });
  };

  // END GAME

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
      difficulty: 36,
    }));
  };

  render() {
    const board = this.state.solution
      ? this.state.completedBoard
      : this.state.board;
    let notificationMessage = (
      <div>
        <p>
          {this.state.checkSolution === true
            ? "RIGHT"
            : !this.state.checkSolution === false
            ? "WRONG"
            : null}
        </p>
      </div>
    );
    return (
      <StyledMainWrapper onClick={(e) => this.deselect(e)}>
        <StyledMain onClick={(e) => e.stopPropagation()}>
          {notificationMessage}
          {this.state.startGame ? (
            <StyledCloseButtonWrapper>
              <Button
                name={<i class="fas fa-times"></i>}
                onClick={() => {
                  this.endGame();
                }}
              />
            </StyledCloseButtonWrapper>
          ) : null}
          {this.state.startGame ? (
            <GameBoard
              gameMode={this.state.mode}
              board={board}
              lockedCell={this.state.lockedCells}
              selectedIndex={this.state.selectedIndex}
              onClick={this.getIndex}
            />
          ) : (
            <StartScreen
              startNewGame={(e) => {
                this.startNewGame(e);
              }}
              modeHandler={(e) => {
                this.modeHandler(e);
              }}
              difficultyHandler={(e) => {
                this.difficultyHandler(e);
              }}
              difficulty={this.state.difficulty}
              gameMode={this.state.mode}
            />
          )}

          <GameNumbers
            possibleNumbers={this.state.possibleNumbers}
            onClick={this.setNewNumber}
          />
          {this.state.startGame ? (
            <ControlPanel
              resetGame={() => {
                this.resetGame();
              }}
              showSolution={() => {
                this.showSolution();
              }}
              checkSolution={() => {
                this.checkSolution(this.state.board, this.state.completedBoard);
              }}
              setNewNumber={() => {
                this.setNewNumber(0);
              }}
            />
          ) : null}
        </StyledMain>
      </StyledMainWrapper>
    );
  }
}

export default Main;
