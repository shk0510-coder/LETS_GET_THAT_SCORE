import { ReadingTest } from "@/data/reading/types";
import { getBlankMeta } from "./fillParser";
import { ModuleAnswers } from "./state";

export type GradedItem = {
  module: number;
  number: number;
  type: "fill" | "mcq";
  prompt: string;
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  explanation: string;
};

export function gradeTest(
  test: ReadingTest,
  answers: ModuleAnswers[]
): GradedItem[] {
  const results: GradedItem[] = [];

  test.modules.forEach((mod, mi) => {
    const blanks = getBlankMeta(mod.completeWords.paragraph, mod.completeWords.answers);

    for (let i = 0; i < 10; i++) {
      const blank = blanks.find((b) => b.number === i + 1);
      const correctWord = mod.completeWords.answers[i] || "";
      const correct = blank ? correctWord.slice(blank.prefix.length).trim() : "";
      const user = (answers[mi].fill[i] || "").trim();
      const isCorrect = user.toLowerCase() === correct.toLowerCase();

      results.push({
        module: mi + 1,
        number: i + 1,
        type: "fill",
        prompt: "Complete the Words",
        question: `Blank (${i + 1})`,
        userAnswer: user,
        correctAnswer: correct,
        isCorrect,
        explanation: mod.completeWords.explanations?.[i] || "",
      });
    }

    const allMcq = [
      ...mod.dailyLife.notice.questions,
      ...mod.dailyLife.post.questions,
      ...mod.dailyLife.message.questions,
      ...mod.academicPassage.questions,
    ];

    allMcq.forEach((q) => {
      const userIndex = answers[mi].mcq[q.number]?.selectedIndex ?? null;
      const isCorrect = userIndex === q.answerIndex;

      results.push({
        module: mi + 1,
        number: q.number,
        type: "mcq",
        prompt: q.number <= 15 ? "Read in Daily Life" : "Read an Academic Passage",
        question: q.question,
        userAnswer: userIndex != null ? q.choices[userIndex] : "",
        correctAnswer: q.choices[q.answerIndex],
        isCorrect,
        explanation: q.explanation || "",
      });
    });
  });

  return results;
}
