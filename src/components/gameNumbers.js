import React from "react";
import { Box, Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  styledGameNumbers: {
    marginTop: "10px",
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down(theme.breakpoints.values.laptopL)]: {
      marginTop: "3px",
    },
  },
  styledCell: {
    minWidth: "0",
    padding: "5px",
    margin: "1px",
    fontWeight: "600",
    [theme.breakpoints.up(theme.breakpoints.values.laptopL)]: {
      fontSize: (gameMode) => (gameMode === 4 ? "1.6rem" : "1.4rem"),
      width: (gameMode) => (gameMode === 9 ? "60px" : "70px"),
      height: (gameMode) => (gameMode === 9 ? "60px" : "70px"),
    },
    [theme.breakpoints.down(theme.breakpoints.values.laptopL)]: {
      fontSize: (gameMode) => (gameMode === 4 ? "2rem" : "1.4rem"),
      width: (gameMode) => (gameMode === 9 ? "45px" : "70px"),
      height: (gameMode) => (gameMode === 9 ? "45px" : "70px"),
    },
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      fontSize: (gameMode) => (gameMode === 4 ? "2rem" : "1.4rem"),
      width: (gameMode) => (gameMode === 9 ? "45px" : "80px"),
      height: (gameMode) => (gameMode === 9 ? "45px" : "80px"),
    },
    [theme.breakpoints.down(theme.breakpoints.values.mobileL)]: {
      fontSize: (gameMode) => (gameMode === 4 ? "1.8rem" : "1.2rem"),
      width: (gameMode) => (gameMode === 9 ? "40px" : "75px"),
      height: (gameMode) => (gameMode === 9 ? "40px" : "75px"),
    },
    [theme.breakpoints.down(theme.breakpoints.values.mobileM)]: {
      fontSize: (gameMode) => (gameMode === 4 ? "1.8rem" : "1.1rem"),
      width: (gameMode) => (gameMode === 9 ? "35px" : "65px"),
      height: (gameMode) => (gameMode === 9 ? "35px" : "65px"),
    },
  },
}));

const GameNumbers = ({ possibleNumbers, onClick, gameMode }) => {
  const classes = useStyles(gameMode);
  const gameNumbers = possibleNumbers.map((item, index) => (
    <Button
      className={classes.styledCell}
      variant="contained"
      color="primary"
      onClick={() => {
        onClick(item);
      }}
      key={index}
    >
      {item}
    </Button>
  ));
  return <Box className={classes.styledGameNumbers}>{gameNumbers}</Box>;
};

export default GameNumbers;
