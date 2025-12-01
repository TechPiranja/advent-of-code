import { expect, test } from "bun:test";
import {
  getDay1_2Answer,
  getDay1Answer,
  getDay1TestInputAnswer,
  getDay2TestInputAnswer,
} from "./day1";

test("Day 1 Part 1 Test", async () => {
  const answer = await getDay1TestInputAnswer();
  expect(answer).toBe(3);
});

test("Day 1 Part 1", async () => {
  const answer = await getDay1Answer();
  expect(answer).toBe(984);
});

test("Day 1 Part 2 Test", async () => {
  const answer = await getDay2TestInputAnswer();
  expect(answer).toBe(6);
});

test("Day 1 Part 2", async () => {
  const answer = await getDay1_2Answer();
  expect(answer).toBe(5657);
});
