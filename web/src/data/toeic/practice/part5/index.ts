export type { Part5PracticeQuestion, Part5PracticeSet } from "./types";
export { PRACTICE_PART5_SETS } from "./sets";

import { PRACTICE_PART5_SETS } from "./sets";

export function getPracticeSet(practiceNumber: number) {
  return PRACTICE_PART5_SETS.find((s) => s.practiceNumber === practiceNumber);
}
