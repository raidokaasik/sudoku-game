const checkRows = (grid, row, value) => {
  if (grid[row].indexOf(value) === -1) {
    return true;
  }
  return false;
};
const checkCols = (grid, col, value) => {
  for (let i = 0; i < 4; i++) {
    if (grid[i][col] === value) {
      return false;
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

const isCellValid = (grid, row, col, value) => {
  if (
    checkRows(grid, row, value) &&
    checkCols(grid, col, value) &&
    check4x4Box(grid, row, col, value)
  ) {
    return true;
  }
  return false;
};

export { isCellValid };
