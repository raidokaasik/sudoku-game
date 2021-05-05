import React from "react";
import styled from "styled-components";

const StyledNewgameScreen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  /* justify-content: center; */
  background: #f5f5f2;
  border: solid 1px #d3d8db;
  border-radius: 5px;
  min-height: 600px;
  min-width: 600px;
  form {
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
    top: 430px;
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
    top: 310px;
    left: 200px;
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
    top: 360px;
    left: 168px;
    label {
      font-weight: 400;
      font-size: 1rem;
      color: #576063;
    }
  }
  @media (max-width: 630px) {
    min-width: 450px;
    min-height: 600px;
    h1 {
      margin: 80px 0 0 0;
    }
    h3 {
      margin: 30px 0 0 0;
    }
    section {
      top: 230px;
      left: 125px;
    }
    div {
      left: 93px;
      top: 280px;
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
              {/* <option value="-">-</option> */}
              <option value="36">Easy</option>
              <option value="54">Normal</option>
              <option value="64">Hard</option>
            </select>
          </div>
        ) : null}
        <input type="submit" value="Start" />
      </form>
    </StyledNewgameScreen>
  );
};

export default StartScreen;