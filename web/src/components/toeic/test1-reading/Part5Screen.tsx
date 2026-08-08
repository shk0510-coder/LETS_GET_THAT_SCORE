import { ReadingPageDef, ReadingQuestion } from "@/data/toeic/test1/reading";
import { UseToeicNavResult } from "../test1-listening/hooks/useToeicNav";
import { QuestionColumns } from "./QuestionColumns";

export function Part5Screen({
  page,
  nav,
  getQuestion,
}: {
  page: ReadingPageDef;
  nav: UseToeicNavResult;
  getQuestion?: (id: number) => ReadingQuestion | undefined;
}) {
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

      <QuestionColumns questionIds={page.questionIds} nav={nav} getQuestion={getQuestion} />
    </div>
  );
}
