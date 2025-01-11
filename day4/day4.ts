export async function getDay4Answer() {
  const input = await readInput();
  const inputArray = input.split("\n");

  // find all occurences of XMAS
  const result = ceresSearch(inputArray);

  return result;
}

export async function getDay4_2Answer() {
  const input = await readInput();
  const inputArray = input.split("\n");
  const result = xMasSearch(inputArray);

  return result;
}

export function ceresSearch(input: string[]): number {
  const word = "XMAS";
  const wordLength = word.length;
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
    [1, 1],
    [-1, -1],
    [1, -1],
    [-1, 1],
  ];
  let count = 0;

  function isValid(x: number, y: number): boolean {
    return x >= 0 && x < input.length && y >= 0 && y < input[0].length;
  }

  function searchFrom(x: number, y: number, dx: number, dy: number): boolean {
    for (let i = 0; i < wordLength; i++) {
      const cannotSearch =
        !isValid(x + i * dx, y + i * dy) ||
        input[x + i * dx][y + i * dy] !== word[i];

      if (cannotSearch) return false;
    }
    return true;
  }

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      for (const [dx, dy] of directions) {
        if (searchFrom(i, j, dx, dy)) {
          count++;
        }
      }
    }
  }

  return count;
}

export function xMasSearch(inputArray: string[]): number {
  let count = 0;
  const rows = inputArray.length;
  const cols = inputArray[0].length;
  const validChars = new Set(["S", "M"]);

  for (let i = 1; i < rows - 1; i++) {
    for (let j = 1; j < cols - 1; j++) {
      if (inputArray[i][j] !== "A") continue;

      const upLeft = inputArray[i - 1][j - 1];
      const upRight = inputArray[i - 1][j + 1];
      const downLeft = inputArray[i + 1][j - 1];
      const downRight = inputArray[i + 1][j + 1];

      if (
        !validChars.has(upLeft) ||
        !validChars.has(upRight) ||
        !validChars.has(downLeft) ||
        !validChars.has(downRight)
      )
        continue;

      if (
        upLeft === upRight &&
        upRight === downLeft &&
        downLeft === downRight
      ) {
        continue;
      }

      const isHorizontal = upLeft === upRight && downLeft === downRight;
      const isVertical = upLeft === downLeft && upRight === downRight;

      if (isHorizontal || isVertical) count++;
    }
  }

  return count;
}
export function xMasSearch2(inputArray: string[]): number {
  let count = 0;
  const rows = inputArray.length;
  const cols = inputArray[0].length;

  // Define the relative positions of the corners
  const corners = [
    [-1, -1], // NW
    [-1, 1], // NE
    [1, 1], // SE
    [1, -1], // SW
  ];

  // Define the valid patterns
  const validPatterns = new Set(["MMSS", "MSSM", "SSMM", "SMMS"]);

  for (let i = 1; i < rows - 1; i++) {
    for (let j = 1; j < cols - 1; j++) {
      // Check if the center is 'A'
      if (inputArray[i][j] !== "A") continue;

      // Get the diagonal characters
      const diagonalChars = corners
        .map(([dx, dy]) => inputArray[i + dx]?.[j + dy] || "")
        .join("");

      // Check if the pattern is valid
      if (validPatterns.has(diagonalChars)) {
        count++;
      }
    }
  }

  return count;
}

// reads input from a file
async function readInput() {
  const path = "./day4/input.txt";
  const file = Bun.file(path);
  return await file.text();
}
