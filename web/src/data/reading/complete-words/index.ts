export type { CompleteWordsBlank, CompleteWordsPassage } from "./types";
export { PRACTICE_COMPLETE_WORDS } from "./sets";

import { PRACTICE_COMPLETE_WORDS } from "./sets";

export function getCompleteWordsSet(practiceNumber: number) {
  return PRACTICE_COMPLETE_WORDS.find((s) => s.practiceNumber === practiceNumber);
}
