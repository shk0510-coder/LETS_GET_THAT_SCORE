import { ReadingPageDef } from "@/data/toeic/test1/reading";
import { UseToeicNavResult } from "../test1-listening/hooks/useToeicNav";
import { PassagePane } from "./PassagePane";
import { QuestionColumns } from "./QuestionColumns";

export function Part6Screen({ page, nav }: { page: ReadingPageDef; nav: UseToeicNavResult }) {
  const set = page.set!;
  const passage = set.passages[0];

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

      <PassagePane passage={passage} className="mb-6" blankIds={set.questionIds} />

      <QuestionColumns
        questionIds={set.questionIds}
        nav={nav}
        className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6"
      />
    </div>
  );
}
