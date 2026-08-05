import { Choice, QUESTIONS } from "@/data/toeic/test1/listening";

export interface PartScore {
  correct: number;
  total: number;
}

export interface ToeicListeningGrade {
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  total: number;
  byPart: Record<1 | 2 | 3 | 4, PartScore>;
  scaledScore: number;
}

// TODO: replace with the official ETS LC conversion table once real answer keys are wired up.
// This is a straight-line approximation between 5 (0 correct) and 495 (100 correct), rounded to the nearest 5.
function estimateScaledScore(correctCount: number, total: number): number {
  const raw = 5 + (correctCount / total) * 490;
  return Math.min(495, Math.max(5, Math.round(raw / 5) * 5));
}

export function gradeToeicListening(answers: Record<number, Choice>): ToeicListeningGrade {
  const byPart: Record<1 | 2 | 3 | 4, PartScore> = {
    1: { correct: 0, total: 0 },
    2: { correct: 0, total: 0 },
    3: { correct: 0, total: 0 },
    4: { correct: 0, total: 0 },
  };

  let correctCount = 0;
  let incorrectCount = 0;

  for (const question of QUESTIONS) {
    byPart[question.part].total += 1;
    const given = answers[question.id];
    if (given === undefined) continue;
    if (given === question.answer) {
      correctCount += 1;
      byPart[question.part].correct += 1;
    } else {
      incorrectCount += 1;
    }
  }

  const total = QUESTIONS.length;
  const unansweredCount = total - correctCount - incorrectCount;

  return {
    correctCount,
    incorrectCount,
    unansweredCount,
    total,
    byPart,
    scaledScore: estimateScaledScore(correctCount, total),
  };
}
