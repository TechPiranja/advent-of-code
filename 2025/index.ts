console.log("Hello via Bun!");

import { getDay1Answer, getDay1_2Answer } from "./day1";

console.log("This is my advent of code 2024!");

const day1Answers = `Day 1 Answers: ${await getDay1Answer()}, ${await getDay1_2Answer()}`;

console.log(day1Answers);
