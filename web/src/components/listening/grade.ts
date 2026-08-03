import { ListeningTest } from "@/data/listening/types";
import { ItemAnswerState } from "./state";

export type GradedItem = {
  module: number;
  number: number;
  prompt: string;
  isCorrect: boolean;
  userAnswer: string;
  correctAnswer: string;
  explanation: string;
};

export type ModuleScore = { total: number; correct: number };

export function gradeTest(
  test: ListeningTest,
  answers: ItemAnswerState[][]
): { reviewed: GradedItem[]; total: number; correct: number; moduleScores: ModuleScore[] } {
  const reviewed: GradedItem[] = [];
  let total = 0;
  let correct = 0;
  const moduleScores: ModuleScore[] = test.modules.map(() => ({ total: 0, correct: 0 }));

  test.modules.forEach((mod, mi) => {
    mod.items.forEach((item, itemIndex) => {
      const answer = answers[mi][itemIndex];

      if (item.kind === "response") {
        total += 1;
        moduleScores[mi].total += 1;
        const selected = answer.kind === "response" ? answer.selectedIndex : null;
        const ok = selected === item.answerIndex;
        if (ok) {
          correct += 1;
          moduleScores[mi].correct += 1;
        }
        reviewed.push({
          module: mi + 1,
          number: item.number,
          prompt: item.instruction,
          isCorrect: ok,
          userAnswer: selected == null ? "" : item.choices[selected],
          correctAnswer: item.choices[item.answerIndex],
          explanation: item.explanation,
        });
      } else {
        item.questions.forEach((q, qIdx) => {
          total += 1;
          moduleScores[mi].total += 1;
          const selected = answer.kind === "set" ? answer.selectedIndexes[qIdx] : null;
          const ok = selected === q.answerIndex;
          if (ok) {
            correct += 1;
            moduleScores[mi].correct += 1;
          }
          reviewed.push({
            module: mi + 1,
            number: q.number,
            prompt: item.instruction,
            isCorrect: ok,
            userAnswer: selected == null ? "" : q.choices[selected],
            correctAnswer: q.choices[q.answerIndex],
            explanation: q.explanation,
          });
        });
      }
    });
  });

  return { reviewed, total, correct, moduleScores };
}
