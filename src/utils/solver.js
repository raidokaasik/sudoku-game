const checkRows = (grid, row, value) => {
  if (grid[row].indexOf(value) === -1) {
    return true;
  }
  return false;
};
const checkCols = (grid, col, value, mode) => {
  for (let i = 0; i < mode; i++) {
    if (grid[i][col] === value) {
      return false;
    }
  }
  return true;
};

const check9x9Box = (grid, row, col, value) => {
  const fromRow = Math.floor(row / 3) * 3;
  const fromCol = Math.floor(col / 3) * 3;
  for (let r = fromRow; r < fromRow + 3; r++) {
    for (let c = fromCol; c < fromCol + 3; c++) {
      if (grid[r][c] === value) {
        return false;
      }
    }
  }
  return true;
};

const check4x4Box = (grid, row, col, value) => {
  const fromRow = Math.floor(row / 2) * 2;
  const fromCol = Math.floor(col / 2) * 2;
  for (let r = fromRow; r <= fromRow + 1; r++) {
    for (let c = fromCol; c <= fromCol + 1; c++) {
      if (grid[r][c] === value) {
        return false;
      }
    }
  }
  return true;
};

const isCellValid = (grid, row, col, value, mode) => {
  const boxValidator =
    mode === 4
      ? check4x4Box(grid, row, col, value)
      : check9x9Box(grid, row, col, value);
  if (
    checkRows(grid, row, value) &&
    checkCols(grid, col, value, mode) &&
    boxValidator
  ) {
    return true;
  }
  return false;
};

const nextCell = (grid, mode) => {
  for (let r = 0; r < mode; r++) {
    for (let c = 0; c < mode; c++) {
      if (grid[r][c] === 0) {
        return [r, c];
      }
    }
  }
  return ["done"];
};

const solution = (grid, mode) => {
  let empty = nextCell(grid, mode);
  const row = empty[0];
  const col = empty[1];
  if (row === "done") return;
  for (let i = 1; i <= mode; i++) {
    if (isCellValid(grid, row, col, i, mode)) {
      grid[row][col] = i;
      solution(grid, mode);
    }
  }
  if (nextCell(grid, mode)[0] !== "done") grid[row][col] = 0;
  return grid;
};

const reversedSolution = (grid, mode) => {
  let empty = nextCell(grid, mode);
  const row = empty[0];
  const col = empty[1];
  if (row === "done") return;
  for (let i = mode; i >= 1; i--) {
    if (isCellValid(grid, row, col, i, mode)) {
      grid[row][col] = i;
      reversedSolution(grid, mode);
    }
  }
  if (nextCell(grid, mode)[0] !== "done") grid[row][col] = 0;
  return grid;
};

export { solution, reversedSolution };
