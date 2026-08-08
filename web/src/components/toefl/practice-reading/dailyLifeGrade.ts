import { DailyLifePassage } from "@/data/reading/daily-life";

export interface DailyLifeGrade {
  correctCount: number;
  total: number;
  results: { number: number; isCorrect: boolean; selectedIndex: number | null }[];
}

export function gradeDailyLife(
  passage: DailyLifePassage,
  answers: Record<number, number>,
): DailyLifeGrade {
  const results = passage.questions.map((q) => {
    const selectedIndex = answers[q.number] ?? null;
    return { number: q.number, isCorrect: selectedIndex === q.answerIndex, selectedIndex };
  });

  return {
    correctCount: results.filter((r) => r.isCorrect).length,
    total: passage.questions.length,
    results,
  };
}
