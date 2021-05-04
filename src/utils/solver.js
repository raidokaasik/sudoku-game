import { isCellValid } from "./validate";

const nextCell = (grid) => {
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (grid[r][c] === 0) {
        return [r, c];
      }
    }
  }
  return ["done"];
};
const solution = (grid) => {
  let copiedArray = [...grid];
  let empty = nextCell(copiedArray);
  const row = empty[0];
  const col = empty[1];
  if (row === "done") return;
  for (let i = 1; i <= 4; i++) {
    if (isCellValid(copiedArray, row, col, i)) {
      copiedArray[row][col] = i;
      solution(copiedArray);
    }
  }
  if (nextCell(copiedArray)[0] !== "done") copiedArray[row][col] = 0;
  // console.log(grid);
  return copiedArray;
};

export { solution };
