export async function getDay3Answer() {
  const input = await readInput();
  const inputArray = input.split("\n");

  let mulSum = 0;

  // find all occurences wich match the pattern: mul(X,Y)
  inputArray.map((line) => {
    const matches = [...line.matchAll(/mul\((\d+),(\d+)\)/g)];
    matches.forEach((res) => {
      if (res) mulSum += parseInt(res[1]) * parseInt(res[2]);
    });
  });

  return mulSum;
}

export async function getDay3_2Answer() {
  const input = await readInput();
  const inputArray = input.split("\n");
}

// reads input from a file
async function readInput() {
  const path = "./day3/input.txt";
  const file = Bun.file(path);
  return await file.text();
}
