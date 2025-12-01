// challenge: get total amounts of points at pos 0
export async function getDay1Answer() {
  const inputArray = await getInputArr();
  return getTotalAmountsAtPos0(inputArray);
}

async function getTotalAmountsAtPos0(inputArray: string[]) {
  let totalPoints = 0;
  let currPos = 50;

  for (let i = 0; i < inputArray.length; i++) {
    const line = inputArray[i];
    const pos = line.slice(0, 1)[0];
    const points = parseInt(line.slice(1));

    let operation = pos === "L" ? -1 : 1;

    currPos = currPos + operation * points;
    if (currPos < 0) currPos += 100;
    currPos = currPos % 100;

    if (currPos === 0) {
      totalPoints++;
    }
  }

  return totalPoints;
}

export async function getDay1TestInputAnswer() {
  const inputArray = await getInputArr("testInput.txt");
  return getTotalAmountsAtPos0(inputArray);
}

export async function getDay2TestInputAnswer() {
  const inputArray = await getInputArr("testInput.txt");
  return getTotalAmountsOf0Path(inputArray);
}

// challenge: find the similarity score of the two arrays
export async function getDay1_2Answer() {
  const inputArray = await getInputArr();
  return getTotalAmountsOf0Path(inputArray);
}

async function getTotalAmountsOf0Path(inputArray: string[]) {
  let totalPoints = 0;
  let currPos = 50;

  for (let i = 0; i < inputArray.length; i++) {
    const line = inputArray[i];
    const dir = line[0];
    const n = parseInt(line.slice(1));
    for (let j = 0; j < n; j++) {
      currPos += dir === "L" ? -1 : 1;
      if (currPos < 0 || currPos > 99) {
        currPos = ((currPos % 100) + 100) % 100;
      }
      if (currPos === 0) totalPoints++;
    }
  }

  return totalPoints;
}

async function getInputArr(fileInput = "input.txt") {
  const path = `./day1/${fileInput}`;
  const file = Bun.file(path);
  const input = await file.text();
  // the lines are separated by new lines
  const inputArray = input.split("\n");

  return inputArray;
}
