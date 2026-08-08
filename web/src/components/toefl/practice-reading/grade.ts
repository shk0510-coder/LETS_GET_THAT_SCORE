import { CompleteWordsPassage } from "@/data/reading/complete-words";

export interface CompleteWordsGrade {
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  total: number;
}

export function gradeCompleteWords(
  passage: CompleteWordsPassage,
  answers: Record<number, string>,
): CompleteWordsGrade {
  let correctCount = 0;
  let incorrectCount = 0;

  for (const blank of passage.blanks) {
    const given = (answers[blank.no] || "").trim();
    if (!given) continue;
    const correctSuffix = blank.answer.slice(blank.revealed.length);
    if (given.toLowerCase() === correctSuffix.toLowerCase()) {
      correctCount += 1;
    } else {
      incorrectCount += 1;
    }
  }

  const total = passage.blanks.length;
  return {
    correctCount,
    incorrectCount,
    unansweredCount: total - correctCount - incorrectCount,
    total,
  };
}
