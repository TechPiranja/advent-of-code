export async function getDay2Answer() {
  const input = await readInput();
  const inputArray = input.split("\n");

  let safeLevels = 0;

  for (let i = 0; i < inputArray.length; i++) {
    // checking if the level is safe
    const line = inputArray[i];
    const level = line.split(" ");
    if (isLevelSafe(level)) safeLevels++;
  }

  return safeLevels;
}

export async function getDay2_2Answer() {
  const input = await readInput();
  return 0;
}

// A report only counts as safe if both of the following are true:
// The levels are either all increasing or all decreasing.
// Any two adjacent levels differ by at least one and at most three.
function isLevelSafe(level: string[]): boolean {
  let levelsIncreasing = false;
  let levelsDecreasing = false;
  let biggestDistance = 0;

  // we check the first two spots
  if (parseInt(level[0]) < parseInt(level[1])) {
    levelsIncreasing = true;
  } else if (parseInt(level[0]) > parseInt(level[1])) {
    levelsDecreasing = true;
  } else {
    console.log("distance is 0", level[0], "and", level[1]);
    return false;
  }

  biggestDistance = Math.abs(parseInt(level[1]) - parseInt(level[0]));
  if (biggestDistance > 3) {
    console.log("biggestDistance", biggestDistance);
    return false;
  }

  // check for the rest
  for (let i = 1; i < level.length - 1; i++) {
    const prevState: { levelsIncreasing: boolean; levelsDecreasing: boolean } =
      {
        levelsIncreasing,
        levelsDecreasing,
      };

    const current = parseInt(level[i]);
    const next = parseInt(level[i + 1]);
    const distance = next - current;

    if (distance > 0) {
      levelsIncreasing = true;
    } else if (distance < 0) {
      levelsDecreasing = true;
    } else {
      console.log("distance is 0");
      return false;
    }

    if (Math.abs(distance) > biggestDistance) {
      biggestDistance = Math.abs(distance);
      if (biggestDistance > 3) {
        console.log("biggestDistance", biggestDistance);
        return false;
      }
    }

    // check if level is not safe anymore
    if (prevState.levelsIncreasing !== levelsIncreasing) {
      console.log(prevState, levelsIncreasing);
      console.log("levels are not increasing anymore");
      return false;
    }
    if (prevState.levelsDecreasing !== levelsDecreasing) {
      console.log(prevState, levelsDecreasing);
      console.log("levels are not decreasing anymore");
      return false;
    }
  }
  console.log(level);
  return true;
}

// reads input from a file
async function readInput() {
  const path = "./day2/input.txt";
  const file = Bun.file(path);
  return await file.text();
}
