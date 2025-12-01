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

  let mulSum = 0;
  let doEnabled = true;

  inputArray.forEach((line) => {
    const instructions = [
      ...line.matchAll(/(mul\((\d+),(\d+)\)|do\(\)|don't\(\))/g),
    ];

    instructions.forEach((match) => {
      if (match[0].startsWith("mul(")) {
        if (doEnabled) {
          const x = parseInt(match[2]);
          const y = parseInt(match[3]);
          mulSum += x * y;
        }
      } else if (match[0] === "do()") {
        doEnabled = true;
      } else if (match[0] === "don't()") {
        doEnabled = false;
      }
    });
  });

  return mulSum;
}

// reads input from a file
async function readInput() {
  const path = "./day3/input.txt";
  const file = Bun.file(path);
  return await file.text();
}
