import { Choice, Question } from "./types";

const GRAPHIC_SET_STARTS = new Set([62, 65, 68, 95, 98]);
const CHOICE_LETTERS: Choice[] = ["A", "B", "C", "D"];

function partForQuestion(id: number): 1 | 2 | 3 | 4 {
  if (id <= 6) return 1;
  if (id <= 31) return 2;
  if (id <= 70) return 3;
  return 4;
}

function setStartFor(id: number, part: 3 | 4): number {
  const firstId = part === 3 ? 32 : 71;
  return id - ((id - firstId) % 3);
}

function placeholderAnswer(id: number): Choice {
  return CHOICE_LETTERS[id % CHOICE_LETTERS.length];
}

function buildQuestion(id: number): Question {
  const part = partForQuestion(id);
  const choiceCount = part === 2 ? 3 : 4;
  const isSetPart = part === 3 || part === 4;

  const question: Question = {
    id,
    part,
    choiceCount,
    answer: placeholderAnswer(id),
    script: `[Q${id} 오디오 스크립트]`,
    explanation: `[Q${id} 정답 해설]`,
  };

  if (part === 2) {
    question.promptText = "Select the best response.";
  } else if (isSetPart) {
    question.promptText = `[Q${id} 질문 텍스트]`;
    question.options = Array.from(
      { length: choiceCount },
      (_, i) => `[Q${id} 선택지 ${CHOICE_LETTERS[i]}]`,
    );
  }

  if (part === 1) {
    question.photoSrc = `/toeic/test1/part1/q${String(id).padStart(3, "0")}.jpg`;
  }

  if (isSetPart) {
    const setStart = setStartFor(id, part);
    if (GRAPHIC_SET_STARTS.has(setStart)) {
      question.graphicSrc = `/toeic/test1/graphics/q${String(setStart).padStart(3, "0")}.png`;
    }
  }

  return question;
}

export const QUESTIONS: Question[] = Array.from({ length: 100 }, (_, i) => buildQuestion(i + 1));

export function getQuestion(id: number): Question | undefined {
  return QUESTIONS.find((q) => q.id === id);
}
