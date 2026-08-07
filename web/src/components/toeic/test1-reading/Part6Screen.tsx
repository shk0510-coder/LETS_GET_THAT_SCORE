import { getQuestion, ReadingPageDef } from "@/data/toeic/test1/reading";
import { UseToeicNavResult } from "../test1-listening/hooks/useToeicNav";
import { splitIntoColumns } from "./columnSplit";
import { PassagePane } from "./PassagePane";
import { ReadingQuestionBlock } from "./ReadingQuestionBlock";

export function Part6Screen({ page, nav }: { page: ReadingPageDef; nav: UseToeicNavResult }) {
  const set = page.set!;
  const passage = set.passages[0];
  const [leftIds, rightIds] = splitIntoColumns(set.questionIds);

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
        <div className="border border-black/20 px-4 py-3 mb-6">
          <p className="font-bold text-sm mb-1">PART 6</p>
          <p className="text-[13px] leading-relaxed">
            <span className="font-semibold">Directions:</span> Read each of the texts below. Within each text,
            a word, phrase, or sentence is missing at certain points. Four answer choices for each blank are
            provided beneath the text. Choose the option that best completes the text, then click (A), (B),
            (C), or (D) to record your answer.
          </p>
        </div>
      )}

      <PassagePane passage={passage} className="mb-6" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
        <div className="flex flex-col gap-6">{leftIds.map(renderQuestion)}</div>
        <div className="flex flex-col gap-6">{rightIds.map(renderQuestion)}</div>
      </div>
    </div>
  );
}
