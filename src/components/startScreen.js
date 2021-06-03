import React from "react";
import { device } from "../theme/devices";
import { Button, makeStyles } from "@material-ui/core";
import styled from "styled-components";

const StyledNewgameScreen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background: #f5f5f2;
  border: solid 1px #d3d8db;
  border-radius: 5px;
  height: 600px;
  width: 600px;
  form {
    width: 250px;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  h1 {
    margin: 150px 0 0 0;
    font-weight: 800;
    font-size: 4.5rem;
    color: #333a3d;
  }
  h3 {
    margin: 50px 0 0 0;
    font-weight: 300;
    font-size: 1.5rem;
    color: #576063;
  }
  select {
    cursor: pointer;
    outline: none;
    border-radius: 3px;
    border: solid 1px #d3d8db;
    height: 30px;
    width: 110px;
    padding-left: 5px;
    font-size: 1rem;
    color: #576063;
    &:hover {
      border: solid 1px #b6bcbf;
    }
  }
  input {
    position: absolute;
    top: 120px;
    cursor: pointer;
    outline: none;
    background: #fff;
    border: solid 1px #d3d8db;
    padding: 7px 15px;
    width: 160px;
    border-radius: 5px;
    color: #576063;
    font-size: 1.2rem;

    &:hover {
      border: solid 1px #bbc1c4;
      background: #d7eef7;
    }
  }
  section {
    margin: 10px 0 0 0;
    position: absolute;
    display: flex;
    gap: 10px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    top: 20px;
    right: 70px;

    label {
      font-weight: 400;
      font-size: 1rem;
      color: #576063;
    }
  }
  div {
    position: absolute;
    display: flex;
    gap: 10px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    top: 71px;
    right: 70px;
    label {
      font-weight: 400;
      font-size: 1rem;
      color: #576063;
    }
  }
  @media ${device.laptopL} {
    min-width: 320px;
    width: 90%;
    h1 {
      margin: 70px 0 0 0;
    }
  }
  @media ${device.mobileL} {
    h1 {
      font-weight: 800;
      font-size: 3.5rem;
      margin: 70px 0 0 0;
    }
  }
`;

const StartScreen = ({
  startNewGame,
  modeHandler,
  gameMode,
  difficulty,
  difficultyHandler,
}) => {
  return (
    <StyledNewgameScreen>
      <h1>Sudoku</h1>
      <h3>New game</h3>
      <form onSubmit={startNewGame}>
        <section>
          <label name="mode">Type</label>
          <select name="mode" id="mode" value={gameMode} onChange={modeHandler}>
            <option value="9">9x9</option>
            <option value="4">4x4</option>
          </select>
        </section>
        {gameMode === 9 ? (
          <div>
            <label name="difficulty">Difficulty</label>
            <select
              name="difficulty"
              id="difficulty"
              value={difficulty}
              onChange={difficultyHandler}
            >
              <option value="15">Easy</option>
              <option value="20">Normal</option>
              <option value="25">Hard</option>
            </select>
          </div>
        ) : null}
        <input type="submit" value="Start" />
      </form>
    </StyledNewgameScreen>
  );
};

export default StartScreen;
