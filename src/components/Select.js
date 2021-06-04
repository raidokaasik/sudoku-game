import React from "react";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles({
  select: {
    width: "120px",
  },
});

const SelectButton = ({ ...options }) => {
  const classes = useStyles();
  const { label, value, onChange, buttonType } = { ...options };
  const difficulties = [{ 15: "Easy" }, { 20: "Normal" }, { 25: "Hard" }];
  const modes = [{ 9: "9x9" }, { 4: "4x4" }];
  const difficultyOptions =
    buttonType === "difficulties"
      ? difficulties.map((item, index) => {
          return (
            <option key={index} value={Object.keys(item)[0]}>
              {Object.values(item)}
            </option>
          );
        })
      : modes.map((item, index) => {
          return (
            <option key={index} value={Object.keys(item).toString()}>
              {Object.values(item)}
            </option>
          );
        });

  return (
    <Box>
      <InputLabel htmlFor="mode">{label}</InputLabel>
      <Select
        native
        id={buttonType === "difficulties" ? "difficulty" : "mode"}
        className={classes.select}
        value={value}
        onChange={onChange}
      >
        {difficultyOptions}
      </Select>
    </Box>
  );
};

export default SelectButton;
