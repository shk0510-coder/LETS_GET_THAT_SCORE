import test1 from "./test1.json";
import test2 from "./test2.json";
import test3 from "./test3.json";
import test4 from "./test4.json";
import test5 from "./test5.json";
import { ReadingTest } from "./types";

const READING_TESTS: Record<string, ReadingTest> = {
  test1: test1 as ReadingTest,
  test2: test2 as ReadingTest,
  test3: test3 as ReadingTest,
  test4: test4 as ReadingTest,
  test5: test5 as ReadingTest,
};

export const READING_TEST_IDS = Object.keys(READING_TESTS);

export function getReadingTest(testId: string): ReadingTest | undefined {
  return READING_TESTS[testId];
}

export type { ReadingTest, ReadingModule, MCQQuestion, DailyLifeItem } from "./types";
