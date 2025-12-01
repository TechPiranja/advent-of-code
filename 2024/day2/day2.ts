export async function getDay2Answer() {
  const input = await readInput();
  const inputArray = input.split("\n");
  let safeLevels = inputArray.filter((line) => isLevelSafe(line.split(" "), 0));

  return safeLevels.length;
}

export async function getDay2_2Answer() {
  const input = await readInput();
  const inputArray = input.split("\n");
  let safeLevels = inputArray.filter((line) => isLevelSafe(line.split(" "), 1));

  return safeLevels.length;
}

// A report only counts as safe if both of the following are true:
// The levels are either all increasing or all decreasing.
// Any two adjacent levels differ by at least one and at most three.
function isLevelSafe(level: string[], errorsToSkip: number): boolean {
  let errors = 0;

  // Compute distances between levels
  const distances = level
    .map((val, i) => parseInt(level[i + 1]) - parseInt(val))
    .slice(0, -1);

  // Determine initial trend
  const increasing = distances[0] > 0;
  const decreasing = distances[0] < 0;
  if (!increasing && !decreasing) errors++;

  // Validate distances and trend consistency
  distances.forEach((distance, i) => {
    if (Math.abs(distance) < 1 || Math.abs(distance) > 3) errors++;
    if (i > 0 && ((increasing && distance < 0) || (decreasing && distance > 0)))
      errors++;
  });

  return errors <= errorsToSkip;
}

// reads input from a file
async function readInput() {
  const path = "./day2/input.txt";
  const file = Bun.file(path);
  return await file.text();
}
