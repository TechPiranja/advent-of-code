import { getDay1Answer, getDay1_2Answer } from "./day1";
import { getDay2_2Answer, getDay2Answer } from "./day2";
import { getDay3Answer, getDay3_2Answer } from "./day3";

console.log("This is my advent of code 2024!");
console.log("Day 1 Part 1 Answer: " + (await getDay1Answer())); // 2176849
console.log("Day 1 Part 2 Answer: " + (await getDay1_2Answer())); // 23384288
console.log("Day 2 Part 1 Answer: " + (await getDay2Answer())); // 0
console.log("Day 2 Part 2 Answer: " + (await getDay2_2Answer())); // 0
console.log("Day 3 Part 1 Answer: " + (await getDay3Answer())); // 0
console.log("Day 3 Part 2 Answer: " + (await getDay3_2Answer())); // 0
