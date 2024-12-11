export async function getDay4Answer() {
  const input = await readInput();
  const inputArray = input.split("\n");

  return 0;
}

export async function getDay4_2Answer() {
  const input = await readInput();
  const inputArray = input.split("\n");

  return 0;
}

// reads input from a file
async function readInput() {
  const path = "./day4/input.txt";
  const file = Bun.file(path);
  return await file.text();
}
