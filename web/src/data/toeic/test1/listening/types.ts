export type Choice = "A" | "B" | "C" | "D";

export interface Question {
  id: number; // 1 ~ 100
  part: 1 | 2 | 3 | 4;
  choiceCount: 3 | 4; // Part 2 only = 3
  photoSrc?: string; // Part 1 photo
  graphicSrc?: string; // Part 3/4 diagram
  promptText?: string; // Part 3/4 question text, Part 2 = "Select the best response."
  options?: string[]; // Part 3/4 option text (Part 1/2 have none)
  answer: Choice;
  script?: string; // audio transcript, for results page
  explanation?: string; // answer explanation
  optionExplanations?: Partial<Record<Choice, string>>; // why each wrong option is wrong
}

export interface AudioItem {
  id: string; // 'p1-directions', 'p1-q001', 'p2-directions', 'p3-set032'
  src: string;
  order: number; // global sequential order, 1 ~ N
  questionIds: number[]; // questions this audio covers
}

export type PageLayout = "intro" | "part1" | "part2" | "set" | "end";

export interface PageSet {
  audioId: string;
  questionIds: number[];
  graphicSrc?: string;
}

export interface PageDef {
  index: number; // 1-based, recomputed from array position
  part: 1 | 2 | 3 | 4 | null;
  layout: PageLayout;
  showDirections: boolean;
  audioIds: string[];
  questionIds: number[];
  sets?: PageSet[];
}
