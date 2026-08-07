import { getQuestion } from "@/data/toeic/test1/reading";
import { UseToeicNavResult } from "../test1-listening/hooks/useToeicNav";
import { splitIntoColumns } from "./columnSplit";
import { ReadingQuestionBlock } from "./ReadingQuestionBlock";

/**
 * Left column filled top-to-bottom first, then right — the rule used by
 * Listening Part 2 and Reading Part 5/6, generalized here so Part 7 (and
 * any future page) doesn't re-copy the split + render logic.
 */
export function QuestionColumns({
  questionIds,
  nav,
  className = "grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6",
}: {
  questionIds: number[];
  nav: UseToeicNavResult;
  className?: string;
}) {
  const [leftIds, rightIds] = splitIntoColumns(questionIds);

  function renderQuestion(questionId: number) {
    const question = getQuestion(questionId);
    if (!question) return null;
    return (
      <ReadingQuestionBlock
        key={questionId}
        questionId={questionId}
        question={question}
        selected={nav.answers[questionId]}
        onSelect={(choice) => nav.setAnswer(questionId, choice)}
      />
    );
  }

  return (
    <div className={className}>
      <div className="flex flex-col gap-6">{leftIds.map(renderQuestion)}</div>
      <div className="flex flex-col gap-6">{rightIds.map(renderQuestion)}</div>
    </div>
  );
}
