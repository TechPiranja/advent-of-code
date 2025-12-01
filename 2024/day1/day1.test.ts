import { expect, test } from "bun:test";
import { getDay1_2Answer, getDay1Answer } from "./day1";

test("Day 1 Part 1", async () => {
  const answer = await getDay1Answer();
  expect(answer).toBe(2176849);
});

test("Day 1 Part 2", async () => {
  const answer = await getDay1_2Answer();
  expect(answer).toBe(23384288);
});
