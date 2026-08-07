import { ReadingPageDef } from "@/data/toeic/test1/reading";
import { UseToeicNavResult } from "../test1-listening/hooks/useToeicNav";
import { PassagePane } from "./PassagePane";
import { QuestionColumns } from "./QuestionColumns";
import { setReferenceLabel } from "./setReferenceLabel";

export function Part7SingleScreen({ page, nav }: { page: ReadingPageDef; nav: UseToeicNavResult }) {
  const set = page.set!;
  const passage = set.passages[0];

  return (
    <div className="flex flex-col">
      {page.showDirections && (
        <div className="border border-black/20 px-4 py-3 mb-6">
          <p className="font-bold text-sm mb-1">PART 7</p>
          <p className="text-[13px] leading-relaxed">
            <span className="font-semibold">Directions:</span> In this part, you will read a variety of texts
            — including magazine and newspaper articles, e-mails, and instant messages. Each text (or set of
            texts) is followed by several questions. For each question, click (A), (B), (C), or (D) to select
            the best answer.
          </p>
        </div>
      )}

      <p className="text-[12px] font-semibold text-[#444] mb-2">{setReferenceLabel(set)}</p>
      <PassagePane passage={passage} className="mb-6 w-full" />

      <QuestionColumns questionIds={set.questionIds} nav={nav} />
    </div>
  );
}
