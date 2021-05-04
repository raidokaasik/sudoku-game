import { isCellValid } from "./validate";

const nextCell = (grid, mode) => {
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
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
  for (let i = 1; i <= 4; i++) {
    if (isCellValid(grid, row, col, i)) {
      grid[row][col] = i;
      solution(grid);
    }
  }
  if (nextCell(grid, mode)[0] !== "done") grid[row][col] = 0;
  return grid;
};

export { solution };
