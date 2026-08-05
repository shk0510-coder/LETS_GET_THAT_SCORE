export type ToeicPosition =
  | { part: 1; index: number }
  | { part: 2 }
  | { part: 3; setIndex: number }
  | { part: 4; setIndex: number };

export function resolvePosition(questionNumber: number): ToeicPosition {
  if (questionNumber >= 1 && questionNumber <= 6) {
    return { part: 1, index: questionNumber - 1 };
  }
  if (questionNumber >= 7 && questionNumber <= 31) {
    return { part: 2 };
  }
  if (questionNumber >= 32 && questionNumber <= 70) {
    return { part: 3, setIndex: Math.floor((questionNumber - 32) / 3) };
  }
  return { part: 4, setIndex: Math.floor((questionNumber - 71) / 3) };
}

const PART_LABELS: Record<1 | 2 | 3 | 4, string> = {
  1: "Part I — Photographs",
  2: "Part II — Question-Response",
  3: "Part III — Conversations",
  4: "Part IV — Talks",
};

export function partLabel(part: 1 | 2 | 3 | 4): string {
  return PART_LABELS[part];
}
