import { getQuestion, ReadingPageDef } from "@/data/toeic/test1/reading";
import { UseToeicNavResult } from "../test1-listening/hooks/useToeicNav";
import { splitIntoColumns } from "./columnSplit";
import { ReadingQuestionBlock } from "./ReadingQuestionBlock";

export function Part5Screen({ page, nav }: { page: ReadingPageDef; nav: UseToeicNavResult }) {
  const [leftIds, rightIds] = splitIntoColumns(page.questionIds);

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
    <div className="flex flex-col">
      {page.showDirections && (
        <>
          <h2 className="text-2xl font-bold tracking-wide mb-3">READING TEST</h2>
          <p className="text-[15px] leading-relaxed mb-6">
            The Reading test measures your ability to understand written English through several types of
            questions across a range of text formats. This section consists of three parts and runs for
            approximately 75 minutes. Each part includes its own set of directions. For all questions, select
            your answer by clicking the choice that best completes or answers the item — no separate answer
            sheet is required.
          </p>
          <hr className="border-t border-black/15 mb-6" />
          <div className="border border-black/20 px-4 py-3 mb-6">
            <p className="font-bold text-sm mb-1">PART 5</p>
            <p className="text-[13px] leading-relaxed">
              <span className="font-semibold">Directions:</span> Each sentence below has a word or phrase
              missing. Four answer choices are provided beneath the sentence. Choose the option that best
              completes the sentence, then click (A), (B), (C), or (D) to record your answer.
            </p>
          </div>
        </>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
        <div className="flex flex-col gap-6">{leftIds.map(renderQuestion)}</div>
        <div className="flex flex-col gap-6">{rightIds.map(renderQuestion)}</div>
      </div>
    </div>
  );
}
