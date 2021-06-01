import React, { Component } from "react";
import styled from "styled-components";
import { device } from "../theme/devices";
import { solution, reversedSolution } from "../utils/solver";
import GameBoard from "../components/gameBoard";
import ControlPanel from "../components/controlPanel";
import StartScreen from "../components/startScreen";
import Button from "../components/button";
import { deepCopy } from "../utils/deepCopy";

const StyledSidePanel = styled.div`
  display: flex;
  flex-flow: column;
  height: 300px;
  gap: 10px;
  align-items: center;
  @media ${device.tablet} {
    max-height: 160px;
  }
  @media ${device.mobileM} {
    max-height: 120px;
    gap: 4px;
  }
`;

const StyledMain = styled.div`
  z-index: 4;
  position: relative;
  width: 800px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: center;
  align-items: center;
  padding: 0 100px;

  @media ${device.laptopL} {
    padding: 0 30px;
    height: 95%;
    width: 700px;
  }
  @media ${device.tablet} {
    gap: 0;
    flex-direction: column-reverse;
    width: auto;
    padding: 0 0;
    height: 100%;
  }
  @media ${device.mobileL} {
    width: 380px;
  }
  @media ${device.mobileM} {
    width: 350px;
  }
`;
const StyledMainWrapper = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledCheckSolutionContainer = styled.div`
  /* position: absolute;
  top: 380px; */

  /* margin: 10px 0 0 0; */
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  flex-direction: column;
  color: ${(props) => (props.isValid ? "limegreen" : "tomato")};
  i {
    font-size: 1.5rem;
  }
  p {
    font-size: 1.2rem;
  }
  @media ${device.laptopL} {
    top: 440px;
  }
  @media ${device.tablet} {
    /* position: relative; */
    width: 100%;
    min-height: 20px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    i {
      font-size: 1.7rem;
    }
    p {
      font-size: 1.4rem;
    }
  }
`;

const StyledCloseButtonWrapper = styled.div`
  /* position: absolute;
  top: 180px;
  right: 25px; */
  z-index: 10;

  @media ${device.laptopL} {
    top: 220px;
  }
  @media ${device.tablet} {
    display: flex;
    flex-direction: row;
    width: 100%;
    /* padding: ${(props) =>
      props.mode === 9 ? "0 45px 0 0" : "0 65px 0 0"}; */
    justify-content: flex-end;
    position: relative;
    right: 0;
    top: 0;
  }
  @media ${device.mobileL} {
    /* padding: ${(props) =>
      props.mode === 9 ? "0 15px 0 0" : "0 15px 0 0"}; */
  }
  @media ${device.mobileM} {
  }
`;

class Main extends Component {
  state = {
    mode: 9,
    possibleNumbers: [],
    board: [],
    completedBoard: [],
    lockedCells: [],
    startGame: false,
    solution: false,
    checkSolution: null,
    selected: false,
    selectedIndex: [],
    difficulty: 15,
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
      // const numbersToRemove = this.state.mode === 4 ? 5 : this.state.difficulty;
      const numbersToRemove =
        this.state.mode === 4
          ? 5
          : this.state.mode === 9
          ? this.state.difficulty
          : 100;
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
    const numbersToRemove = this.state.mode === 4 ? 5 : this.state.difficulty;
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

  // Creates a set of buttons according to the game mode
  createButtons = () => {
    const nrOfPossibilities = [];
    for (let i = 1; i <= this.state.mode; i++) {
      nrOfPossibilities.push(i);
    }
    return nrOfPossibilities;
  };

  // REMOVE NR OF CELLS
  // remove cells
  removeCells = async (gameMode, numbersToRemove) => {
    let nums = numbersToRemove;
    let newArray = deepCopy(this.state.completedBoard);
    const checker = (gameboard, solution) => {
      for (let r = 0; r < this.state.mode; r++) {
        for (let c = 0; c < this.state.mode; c++) {
          if (gameboard[r][c] !== solution[r][c]) {
            return false;
          }
        }
      }
      return true;
    };

    const helper = (nums) => {
      const randomRow2 = Math.floor(Math.random() * gameMode);
      const randomCol2 = Math.floor(Math.random() * gameMode);
      const randomRow = Math.floor(Math.random() * gameMode);
      const randomCol = Math.floor(Math.random() * gameMode);
      if (nums === 0) return;
      if (randomCol !== randomCol2 || randomRow !== randomRow2) {
        if (
          newArray[randomRow][randomCol] !== 0 &&
          newArray[randomRow2][randomCol2] !== 0
        ) {
          let copiedArray = deepCopy(newArray);
          let reversedArray = deepCopy(newArray);
          copiedArray[randomRow][randomCol] = 0;
          copiedArray[randomRow2][randomCol2] = 0;
          reversedArray[randomRow][randomCol] = 0;
          reversedArray[randomRow2][randomCol2] = 0;
          if (
            checker(
              solution(copiedArray, this.state.mode),
              this.state.completedBoard
            ) &&
            checker(
              reversedSolution(reversedArray, this.state.mode),
              this.state.completedBoard
            )
          ) {
            newArray[randomRow][randomCol] = 0;
            newArray[randomRow2][randomCol2] = 0;
            nums--;
          }
        }
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

  // SHOW & CHECK SOLUTION

  checkSolution = (gameBoard, solution) => {
    const timeOut = () => {
      setTimeout(() => {
        this.setState(() => ({ checkSolution: null }));
      }, 3000);
    };
    for (let r = 0; r < this.state.mode; r++) {
      for (let c = 0; c < this.state.mode; c++) {
        if (gameBoard[r][c] !== solution[r][c]) {
          this.setState(() => ({ checkSolution: false }));
          timeOut();
          return;
        }
      }
    }
    this.setState(() => ({ checkSolution: true }));
    timeOut();
  };
  showSolution = () => {
    this.setState((prev) => ({ solution: !prev.solution }));
  };

  // UTILS

  // Get index of the cell to be modified

  getIndex = (row, col) => {
    this.setState(() => ({ selected: true }));
    const selection = [row, col];
    this.setState(() => ({
      selectedIndex: selection,
    }));
  };

  // Set a new value to the selected Cell

  setNewNumber = (value) => {
    const index = this.state.selectedIndex;
    if (index.length !== 0) {
      let copiedBoard = deepCopy(this.state.board);
      copiedBoard[index[0]][index[1]] = value;
      this.setState({ board: copiedBoard });
    }
  };

  // Creates an array of cells that were originally generated and cannot be modified.

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
      mode: 9,
      possibleNumbers: [],
      board: [],
      completedBoard: [],
      lockedCells: [],
      startGame: false,
      solution: false,
      checkSolution: null,
      selected: false,
      selectedIndex: [],
      difficulty: 15,
    }));
  };

  render() {
    const correct = (
      <>
        <i className="fas fa-check"></i>
        <p>Correct</p>
      </>
    );
    const inCorrect = (
      <>
        <i className="fas fa-times"></i>
        <p>Incorrect</p>
      </>
    );
    const isvalid =
      this.state.checkSolution === true
        ? correct
        : this.state.checkSolution === false
        ? inCorrect
        : null;
    const board = this.state.solution
      ? this.state.completedBoard
      : this.state.board;

    return (
      <StyledMainWrapper onClick={(e) => this.deselect(e)}>
        <StyledMain onClick={(e) => e.stopPropagation()}>
          {this.state.startGame ? (
            <GameBoard
              gameMode={this.state.mode}
              board={board}
              lockedCell={this.state.lockedCells}
              selectedIndex={this.state.selectedIndex}
              onClick={this.getIndex}
              setNewNumber={this.setNewNumber}
              possibleNumbers={this.state.possibleNumbers}
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
          <StyledSidePanel>
            {this.state.startGame ? (
              <StyledCloseButtonWrapper mode={this.state.mode}>
                <Button
                  type="regular"
                  closedButton
                  name={<i className="fas fa-times"></i>}
                  onClick={() => {
                    this.endGame();
                  }}
                />
              </StyledCloseButtonWrapper>
            ) : null}

            {this.state.startGame ? (
              <ControlPanel
                resetGame={() => {
                  this.resetGame();
                }}
                showSolution={() => {
                  this.showSolution();
                }}
                checkSolution={() => {
                  this.checkSolution(
                    this.state.board,
                    this.state.completedBoard
                  );
                }}
                setNewNumber={() => {
                  this.setNewNumber(0);
                }}
                toggleSolution={this.state.solution}
              />
            ) : null}
            <StyledCheckSolutionContainer isValid={this.state.checkSolution}>
              {isvalid}
            </StyledCheckSolutionContainer>
          </StyledSidePanel>
        </StyledMain>
      </StyledMainWrapper>
    );
  }
}

export default Main;
