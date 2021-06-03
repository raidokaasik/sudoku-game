import React from "react";
import { Button, makeStyles } from "@material-ui/core";
import { ToggleButton } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  styledButton: {
    [theme.breakpoints.down(theme.breakpoints.values.mobileM)]: {
      padding: "8px 10px",
      fontSize: "13px",
    },
  },
  styledToggleButton: {
    background: "#7da2e8",
    padding: "6px 16px",
    color: "#fff",
    "&:hover": {
      background: "#5277bf",
      color: "#fff",
    },
    [theme.breakpoints.down(theme.breakpoints.values.mobileM)]: {
      padding: "8px 10px",
      fontSize: "13px",
    },
  },
}));

const ControlButton = ({ onClick, name, selected, closedButton, type }) => {
  const classes = useStyles();
  let button = null;

  switch (type) {
    case "regular":
      button = (
        <Button
          className={classes.styledButton}
          size="medium"
          variant="contained"
          color={closedButton ? "secondary" : "primary"}
          selected={selected}
          onClick={onClick}
        >
          {name}
        </Button>
      );
      break;
    case "toggle":
      button = (
        <ToggleButton
          className={classes.styledToggleButton}
          value="check"
          variant="contained"
          color={closedButton ? "secondary" : "primary"}
          selected={selected}
          onClick={onClick}
        >
          {name}
        </ToggleButton>
      );
      break;
    default:
      break;
  }
  return button;
};

export default ControlButton;
