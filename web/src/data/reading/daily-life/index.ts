export type { DailyLifePassage } from "./types";
export { PRACTICE_DAILY_LIFE } from "./sets";

import { PRACTICE_DAILY_LIFE } from "./sets";

export function getDailyLifeSet(practiceNumber: number) {
  return PRACTICE_DAILY_LIFE.find((s) => s.practiceNumber === practiceNumber);
}
