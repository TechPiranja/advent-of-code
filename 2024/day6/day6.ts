const fs = require("fs");

const directions = {
  "^": [-1, 0],
  ">": [0, 1],
  v: [1, 0],
  "<": [0, -1],
} as { [key: string]: [number, number] };
const orderOfDirections = ["^", ">", "v", "<"];

function findInitialIndex(grid: string[][]): [number, number] {
  // find index of starting point ^
  let x = 0;
  let y = 0;

  for (let i = 0; i < grid.length; i++) {
    if (grid[i].includes("^")) {
      x = i;
      y = grid[i].indexOf("^");
      break;
    }
  }

  return [x, y];
}

export async function getStepsAndObstacles() {
  const input = await readInput();
  const inputArray = input.split("\n");
  const grid = inputArray.map((line) => line.split(""));

  let [x, y] = findInitialIndex(grid);
  let uniqueSteps = 1;
  let obstacles = [] as string[];

  while (isInnerBound(x, y, grid)) {
    const direction = directions[grid[x][y]];
    const oldDirection = grid[x][y];

    grid[x][y] = "X";

    x = x + direction[0];
    y = y + direction[1];

    if (!isInnerBound(x, y, grid)) break;

    if (grid[x][y] === "#") {
      // get next direction
      const index = orderOfDirections.indexOf(oldDirection);
      const nextIndex = (index + 1) % 4;
      const nextDirection = orderOfDirections[nextIndex];

      x = x - direction[0];
      y = y - direction[1];

      grid[x][y] = nextDirection;
    } else {
      if (grid[x][y] !== "X") uniqueSteps++;

      if (grid[x][y] === "X") {
        if (!obstacles.includes([x, y].toString()))
          obstacles.push([x, y].toString());
      } else {
        // get next direction
        const index = orderOfDirections.indexOf(oldDirection);
        const nextIndex = (index + 1) % 4;
        const nextDirection = orderOfDirections[nextIndex];
        const checkDirection = directions[nextDirection];

        let checkX = x - direction[0];
        let checkY = y - direction[1];

        // check that direction until hitting out of bound
        while (
          isInnerBound(checkX, checkY, grid) &&
          grid[checkX][checkY] !== "#"
        ) {
          if (grid[checkX][checkY] === "X") {
            if (!obstacles.includes([checkX, checkY].toString()))
              obstacles.push([checkX, checkY].toString());
            break;
          }
          checkX += checkDirection[0];
          checkY += checkDirection[1];
        }
      }

      grid[x][y] = oldDirection;
    }
  }

  // save grid into file
  const path = "./day6/output.txt";
  const output = grid.map((line) => line.join("")).join("\n");
  fs.writeFileSync(path, output);

  // console.log(obstacles);
  // should be 1304
  return { uniqueSteps, obstacles: obstacles.length };
}

export async function getDay6Answer() {
  const { uniqueSteps } = await getStepsAndObstacles();
  return uniqueSteps;
}

export async function getDay6_2Answer() {
  const { obstacles } = await getStepsAndObstacles();
  // 708 to low
  return obstacles;
}

function isInnerBound(x: number, y: number, grid: string[][]): boolean {
  return x >= 0 && x < grid.length && y >= 0 && y < grid[0].length;
}

// Reads input from a file
async function readInput() {
  const path = "./day6/input.txt";
  const file = Bun.file(path);
  const text = await file.text();
  return text;
}
