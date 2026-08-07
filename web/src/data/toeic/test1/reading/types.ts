export type Choice = "A" | "B" | "C" | "D";

export type PassageType =
  | "e-mail"
  | "web page"
  | "notice"
  | "memo"
  | "advertisement"
  | "review"
  | "article"
  | "schedule"
  | "form"
  | "letter"
  | "text-message"
  | "online chat discussion"
  | "invoice";

export interface ReadingPassage {
  passageId: string; // "P147-1"
  type: PassageType;
  content: string;
}

export interface ReadingQuestion {
  id: number; // 101 ~ 200
  part: 5 | 6 | 7;
  promptText: string; // sentence w/ blank (Part 5), question text (Part 6 sentence-insertion / Part 7), "" for Part 6 word-blank questions
  options: string[];
  answer: Choice;
  explanation?: string;
}

export interface ReadingQuestionSet {
  setId: string; // "Q131-134"
  passageCount: 1 | 2 | 3;
  passages: ReadingPassage[];
  questionIds: number[];
}

export type PageLayout = "part5" | "part6" | "part7single" | "part7double" | "part7triple" | "end";

export interface ReadingPageDef {
  index: number; // 1-based, recomputed from array position
  part: 5 | 6 | 7 | null;
  layout: PageLayout;
  showDirections: boolean;
  questionIds: number[];
  set?: ReadingQuestionSet; // Part 6 / Part 7 pages have exactly one set per page
}
