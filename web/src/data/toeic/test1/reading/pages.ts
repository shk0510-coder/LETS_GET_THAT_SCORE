import { PART6_SETS, PART7_DOUBLE_SETS, PART7_SINGLE_SETS, PART7_TRIPLE_SETS } from "./passages";
import { ReadingPageDef } from "./types";

function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

const PAGES_RAW: Omit<ReadingPageDef, "index">[] = [
  // Part 5 — Incomplete Sentences (intro + directions on P1)
  { part: 5, layout: "part5", showDirections: true, questionIds: range(101, 108) },
  { part: 5, layout: "part5", showDirections: false, questionIds: range(109, 120) },
  { part: 5, layout: "part5", showDirections: false, questionIds: range(121, 130) },

  // Part 6 — Text Completion (directions on P4), one set per page
  { part: 6, layout: "part6", showDirections: true, questionIds: PART6_SETS[0].questionIds, set: PART6_SETS[0] },
  { part: 6, layout: "part6", showDirections: false, questionIds: PART6_SETS[1].questionIds, set: PART6_SETS[1] },
  { part: 6, layout: "part6", showDirections: false, questionIds: PART6_SETS[2].questionIds, set: PART6_SETS[2] },
  { part: 6, layout: "part6", showDirections: false, questionIds: PART6_SETS[3].questionIds, set: PART6_SETS[3] },

  // Part 7 — Single Passages (directions on P8), one set per page
  ...PART7_SINGLE_SETS.map((set, i) => ({
    part: 7 as const,
    layout: "part7single" as const,
    showDirections: i === 0,
    questionIds: set.questionIds,
    set,
  })),

  // Part 7 — Double Passages
  ...PART7_DOUBLE_SETS.map((set) => ({
    part: 7 as const,
    layout: "part7double" as const,
    showDirections: false,
    questionIds: set.questionIds,
    set,
  })),

  // Part 7 — Triple Passages
  ...PART7_TRIPLE_SETS.map((set) => ({
    part: 7 as const,
    layout: "part7triple" as const,
    showDirections: false,
    questionIds: set.questionIds,
    set,
  })),

  // End
  { part: null, layout: "end", showDirections: false, questionIds: [] },
];

export const PAGES: ReadingPageDef[] = PAGES_RAW.map((p, i) => ({ ...p, index: i + 1 }));

export const TOTAL_PAGES = PAGES.length;

export function getPage(index: number): ReadingPageDef | undefined {
  return PAGES.find((p) => p.index === index);
}
