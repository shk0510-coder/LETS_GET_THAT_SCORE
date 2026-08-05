import { PageDef, PageSet } from "./types";
import { PART3_SET_STARTS, PART4_SET_STARTS } from "./audio";

const GRAPHIC_STARTS = new Set([62, 65, 68, 95, 98]);

function part1QuestionPage(start: number): Omit<PageDef, "index"> {
  const questionIds = [start, start + 1];
  return {
    part: 1,
    layout: "part1",
    showDirections: false,
    audioIds: questionIds.map((q) => `p1-q${String(q).padStart(3, "0")}`),
    questionIds,
  };
}

function setsFor(part: 3 | 4, starts: number[]): PageSet[] {
  return starts.map((start) => ({
    audioId: `p${part}-set${String(start).padStart(3, "0")}`,
    questionIds: [start, start + 1, start + 2],
    graphicSrc: GRAPHIC_STARTS.has(start)
      ? `/toeic/test1/graphics/q${String(start).padStart(3, "0")}.png`
      : undefined,
  }));
}

function setPage(part: 3 | 4, starts: number[], showDirections: boolean): Omit<PageDef, "index"> {
  const sets = setsFor(part, starts);
  return {
    part,
    layout: "set",
    showDirections,
    audioIds: sets.map((s) => s.audioId),
    questionIds: sets.flatMap((s) => s.questionIds),
    sets,
  };
}

// Part 3: 13 sets grouped 4/4/3/2 per page (P6-P9). Part 4: 10 sets grouped 4/4/2 (P10-P12).
const PART3_PAGE_GROUPS = [
  PART3_SET_STARTS.slice(0, 4),
  PART3_SET_STARTS.slice(4, 8),
  PART3_SET_STARTS.slice(8, 11),
  PART3_SET_STARTS.slice(11, 13),
];
const PART4_PAGE_GROUPS = [
  PART4_SET_STARTS.slice(0, 4),
  PART4_SET_STARTS.slice(4, 8),
  PART4_SET_STARTS.slice(8, 10),
];

const PAGE_SPECS: Omit<PageDef, "index">[] = [
  // P1
  {
    part: 1,
    layout: "intro",
    showDirections: true,
    audioIds: ["p1-directions"],
    questionIds: [],
  },
  // P2-P4
  part1QuestionPage(1),
  part1QuestionPage(3),
  part1QuestionPage(5),
  // P5 — one audio item covers directions + all of Q7-31 (real Part 2 track).
  {
    part: 2,
    layout: "part2",
    showDirections: true,
    audioIds: ["p2-directions"],
    questionIds: Array.from({ length: 25 }, (_, i) => i + 7),
  },
  // P6-P9
  setPage(3, PART3_PAGE_GROUPS[0], true),
  setPage(3, PART3_PAGE_GROUPS[1], false),
  setPage(3, PART3_PAGE_GROUPS[2], false),
  setPage(3, PART3_PAGE_GROUPS[3], false),
  // P10-P12
  setPage(4, PART4_PAGE_GROUPS[0], true),
  setPage(4, PART4_PAGE_GROUPS[1], false),
  setPage(4, PART4_PAGE_GROUPS[2], false),
  // P13
  {
    part: null,
    layout: "end",
    showDirections: false,
    audioIds: [],
    questionIds: [],
  },
];

// index is derived from array position so inserting/removing a page
// re-numbers everything automatically.
export const PAGES: PageDef[] = PAGE_SPECS.map((spec, i) => ({ ...spec, index: i + 1 }));

export const TOTAL_PAGES = PAGES.length;

export function getPage(index: number): PageDef | undefined {
  return PAGES.find((p) => p.index === index);
}
