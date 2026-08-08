import type { ReadingPageDef } from "./test1/reading";

/**
 * Standard 30-question TOEIC Part 5 page/column layout, reverse-engineered
 * from the real ETS sample booklet (design-reference/toeic_sample.pdf.pdf,
 * pages 14-16): page 1 carries the section-level "READING TEST" intro plus
 * the "PART 5" directions box, which eats enough vertical space that only
 * 8 questions fit; pages 2-3 have no directions overhead and fit 12 and 10
 * respectively. Column split within each page (left-then-right) is handled
 * separately by QuestionColumns. Shared by Test 1 and every Practice by
 * Type Part 5 set — any new 30-question Part 5 set should reuse this
 * instead of hand-splitting page ranges again.
 */
export function standardPart5Pages(
  questionIds: number[],
): Pick<ReadingPageDef, "showDirections" | "questionIds">[] {
  if (questionIds.length !== 30) {
    throw new Error(`standardPart5Pages expects exactly 30 questions, got ${questionIds.length}`);
  }
  return [
    { showDirections: true, questionIds: questionIds.slice(0, 8) },
    { showDirections: false, questionIds: questionIds.slice(8, 20) },
    { showDirections: false, questionIds: questionIds.slice(20, 30) },
  ];
}
