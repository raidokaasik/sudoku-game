import React from "react";
import Button from "./button";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import SelectButton from "./Select";

const useStyles = makeStyles((theme) => ({
  styleNewGameScreen: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    background: "#fff",
    border: "solid 1px #d3d9db",
    borderRadius: "5px",
    height: "600px",
    width: "600px",
    "& form": {
      height: "100%",
      width: "150px",
      display: "flex",
      gap: "10px",
      flexDirection: "column",
      alignItems: "center",
      position: "relative",
    },
    "& h1": {
      margin: "150px 0 0 0",
      fontWeight: "800",
      fontSize: "4.5rem",
      color: "#333a3d",
    },
    "& h3": {
      margin: "50px 0 20px 0",
      fontWeight: "300",
      fontSize: "1.6rem",
      color: "#333a3d",
    },
    [theme.breakpoints.down(theme.breakpoints.values.laptopL)]: {
      minWidth: "320px",
      width: "90%",
      "& h1": {
        margin: "70px 0 0 0",
      },
    },
    [theme.breakpoints.down(theme.breakpoints.values.L)]: {
      "& h1": {
        fontWeight: "800",
        fontSize: "3.5rem",
      },
    },
  },
}));

const StartScreen = ({
  startNewGame,
  modeHandler,
  gameMode,
  difficulty,
  difficultyHandler,
}) => {
  const classes = useStyles();

  return (
    <Box className={classes.styleNewGameScreen}>
      <Typography variant="h1">Sudoku</Typography>
      <Typography variant="h3">New Game</Typography>
      <form onSubmit={startNewGame}>
        <SelectButton
          buttonType="mode"
          label="Type"
          value={gameMode}
          onChange={modeHandler}
        />
        {gameMode === 9 ? (
          <SelectButton
            buttonType="difficulties"
            label="Difficulty"
            value={difficulty}
            onChange={difficultyHandler}
          />
        ) : null}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          name="Start"
        />
      </form>
    </Box>
  );
};

export default StartScreen;
