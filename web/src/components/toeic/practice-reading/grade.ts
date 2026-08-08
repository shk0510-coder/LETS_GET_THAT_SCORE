import { Choice } from "@/data/toeic/test1/reading";
import { Part5PracticeSet } from "@/data/toeic/practice/part5";

export interface Part5PracticeGrade {
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  total: number;
}

export function gradePart5Practice(
  set: Part5PracticeSet,
  answers: Record<number, Choice>,
): Part5PracticeGrade {
  let correctCount = 0;
  let incorrectCount = 0;

  for (const question of set.questions) {
    const given = answers[question.id];
    if (given === undefined) continue;
    if (given === question.answer) {
      correctCount += 1;
    } else {
      incorrectCount += 1;
    }
  }

  const total = set.questions.length;
  return {
    correctCount,
    incorrectCount,
    unansweredCount: total - correctCount - incorrectCount,
    total,
  };
}
