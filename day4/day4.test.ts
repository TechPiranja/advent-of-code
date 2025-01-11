import { expect, test } from "bun:test";
import { ceresSearch, xMasSearch } from "./day4";

test("xMasSearch detects occurrences of XMAS in X shape", () => {
  const inputArray = ["M.M", ".A.", "S.S"];

  const result = xMasSearch(inputArray);
  expect(result).toBe(1);
});

test("xMasSearch detects occurrences of XMAS in X shape", () => {
  const inputArray = ["S.S", ".A.", "M.M"];

  const result = xMasSearch(inputArray);
  expect(result).toBe(1);
});

test("xMasSearch detects occurrences of XMAS in X shape", () => {
  const inputArray = ["S.M", ".A.", "S.M"];

  const result = xMasSearch(inputArray);
  expect(result).toBe(1);
});

test("xMasSearch detects occurrences of XMAS in X shape", () => {
  const inputArray = ["M.S", ".A.", "M.S"];

  const result = xMasSearch(inputArray);
  expect(result).toBe(1);
});

async function readInput() {
  const path = "./day4/testInput.txt";
  const file = Bun.file(path);
  return await file.text();
}

test("ceres search detects 9 occurrences of MAS in X shape", async () => {
  const input = await readInput();
  const inputArray = input.split("\n");
  const result = xMasSearch(inputArray);
  expect(result).toBe(9);
});
