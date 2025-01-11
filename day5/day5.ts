// Function to build the adjacency list from the order
function buildAdjacencyList(order: string): {
  [key: number]: { before: number[]; after: number[] };
} {
  const adjacencyList: {
    [key: number]: { before: number[]; after: number[] };
  } = {};

  order
    .trim()
    .split("\n")
    .forEach((line) => {
      const [left, right] = line.split("|").map(Number);

      if (!adjacencyList[left]) adjacencyList[left] = { before: [], after: [] };
      if (!adjacencyList[right])
        adjacencyList[right] = { before: [], after: [] };

      adjacencyList[left].after.push(right);
      adjacencyList[right].before.push(left);
    });

  return adjacencyList;
}

// Helper function to validate if an update is in correct order
function isValidUpdate(
  pages: number[],
  adjacencyList: { [key: number]: { before: number[]; after: number[] } }
): boolean {
  for (let i = 0; i < pages.length; i++) {
    const currentPage = pages[i];

    // Check if all "before" pages are earlier in the list
    for (const beforePage of adjacencyList[currentPage]?.before || []) {
      if (pages.indexOf(beforePage) === -1) continue;
      if (pages.indexOf(beforePage) > i) return false;
    }

    // Check if all "after" pages are later in the list
    for (const afterPage of adjacencyList[currentPage]?.after || []) {
      if (pages.indexOf(afterPage) === -1) continue;
      if (pages.indexOf(afterPage) < i) return false;
    }
  }
  return true;
}

export async function getDay5Answer() {
  const { order, pages } = await readInput();
  const pageArr = pages.split("\n");
  const adjacencyList = buildAdjacencyList(order);

  let sum = 0;

  // Process each update
  for (const pageLine of pageArr) {
    const splitPages = pageLine.split(",").map(Number);

    if (isValidUpdate(splitPages, adjacencyList)) {
      // Get the middle page of the valid update
      const middle = Math.floor(splitPages.length / 2);
      sum += splitPages[middle];
    }
  }

  return sum;
}

export async function getDay5_2Answer() {
  const { order, pages } = await readInput();
  const pageArr = pages.split("\n");
  const adjacencyList = buildAdjacencyList(order);

  let sum = 0;

  // Process each update
  for (const pageLine of pageArr) {
    const splitPages = pageLine.split(",").map(Number);

    if (!isValidUpdate(splitPages, adjacencyList)) {
      // sort correctly
      splitPages.sort((a, b) => {
        if (adjacencyList[a]?.before.includes(b)) return -1;
        if (adjacencyList[b]?.before.includes(a)) return 1;
        return 0;
      });

      // Get the middle page of the valid update
      const middle = Math.floor(splitPages.length / 2);
      sum += splitPages[middle];
    }
  }

  return sum;
}

// Reads input from a file
async function readInput() {
  const path = "./day5/input.txt";
  const file = Bun.file(path);
  const text = await file.text();

  // Divide text into two arrays
  const groups = text.trim().split(/\n\s*\n/);

  return { order: groups[0], pages: groups[1] };
}
