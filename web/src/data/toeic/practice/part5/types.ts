import type { Choice, ReadingPageDef } from "@/data/toeic/test1/reading";

export interface Part5PracticeQuestion {
  id: number; // 101-130, scoped within this practice set only (not globally unique)
  part: 5;
  promptText: string;
  options: string[];
  answer: Choice;
  explanation: string; // grammar/usage note
  explanationTranslation: string; // full Korean sentence translation
  explanationVocab: string; // key vocab glosses
}

export interface Part5PracticeSet {
  practiceNumber: number; // 1-5
  title: string; // "Part 5 Practice 1"
  questions: Part5PracticeQuestion[]; // 30
  pages: ReadingPageDef[]; // 3, built via standardPart5Pages
}
