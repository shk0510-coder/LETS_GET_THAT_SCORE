import { ReadingTest } from "@/data/reading/types";

export type ModuleAnswers = {
  fill: string[]; // 10 entries; each is the space-padded string of typed chars
  mcq: Record<number, { selectedIndex: number | null }>;
};

export function createInitialAnswers(test: ReadingTest): ModuleAnswers[] {
  return test.modules.map(() => ({
    fill: Array(10).fill(""),
    mcq: {},
  }));
}

// Screen 0 = Complete the Words, screens 1-5 = Daily Life, 6-10 = Academic Passage.
export const SCREENS_PER_MODULE = 11;

export type ScreenType = "fill" | "daily" | "academic";

export function screenTypeFor(screenIndex: number): ScreenType {
  if (screenIndex === 0) return "fill";
  if (screenIndex >= 1 && screenIndex <= 5) return "daily";
  return "academic";
}

export function mcqNumberFor(screenIndex: number): number | null {
  if (screenIndex >= 1 && screenIndex <= 10) return 10 + screenIndex;
  return null;
}
