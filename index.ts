import { getDay1Answer, getDay1_2Answer } from "./day1";
import { getDay2_2Answer, getDay2Answer } from "./day2";
import { getDay3Answer, getDay3_2Answer } from "./day3";
import { getDay4Answer, getDay4_2Answer } from "./day4";

console.log("This is my advent of code 2024!");

const day1Answers = `Day 1 Answers: ${await getDay1Answer()}, ${await getDay1_2Answer()}`;
const day2Answers = `Day 2 Answers: ${await getDay2Answer()}, ${await getDay2_2Answer()}`;
const day3Answers = `Day 3 Answers: ${await getDay3Answer()}, ${await getDay3_2Answer()}`;
const day4Answers = `Day 4 Answers: ${await getDay4Answer()}, ${await getDay4_2Answer()}`;

console.log(day1Answers);
console.log(day2Answers);
console.log(day3Answers);
console.log(day4Answers);
