// challenge: find the total distance between the two arrays
// the arrays are both sorted in ascending order
export async function getDay1Answer() {
  const { leftSide, rightSide, length } = await divideInput();

  const sortedLeftSide = leftSide.sort((a, b) => Number(a) - Number(b));
  const sortedRightSide = rightSide.sort((a, b) => Number(a) - Number(b));

  let totalDistance = 0;

  for (let i = 0; i < length; i++) {
    const left = Number(sortedLeftSide[i]);
    const right = Number(sortedRightSide[i]);
    const distance = right - left;
    totalDistance += Math.abs(distance);
  }

  return totalDistance;
}

// challenge: find the similarity score of the two arrays
export async function getDay1_2Answer() {
  const { leftSide, rightSide, length } = await divideInput();

  // Create a frequency map for rightSide
  const rightFrequency = rightSide.reduce(
    (map: { [key: string]: string }, item) => {
      const newValue = (Number(map[item]) || 0) + 1;
      map[item] = newValue.toString();
      return map;
    },
    {}
  );

  let similarityScore = 0;

  for (let i = 0; i < length; i++) {
    const currItem = leftSide[i];
    if (rightFrequency[currItem]) {
      similarityScore += Number(currItem) * Number(rightFrequency[currItem]);
    }
  }

  return similarityScore;
}

// divide input into two arrays
async function divideInput() {
  const input = await readInput();
  // the lines are separated by new lines
  const inputArray = input.split("\n");
  const length = inputArray.length;

  let leftSide = [];
  let rightSide = [];

  for (let i = 0; i < length; i++) {
    const line = inputArray[i];
    const [firstNumber, secondNumber] = line.split("   ");
    leftSide.push(firstNumber);
    rightSide.push(secondNumber);
  }

  return { leftSide, rightSide, length };
}

// reads input from a file
async function readInput() {
  const path = "./day1/input.txt";
  const file = Bun.file(path);
  return await file.text();
}
