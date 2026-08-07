import { ReadingPageDef } from "@/data/toeic/test1/reading";
import { PaperCard } from "../test1-listening/PaperCard";
import { UseToeicNavResult } from "../test1-listening/hooks/useToeicNav";
import { PassagePane } from "./PassagePane";
import { QuestionColumns } from "./QuestionColumns";
import { setReferenceLabel } from "./setReferenceLabel";

// Each card grows with its content and only scrolls internally past a
// generous cap, so the two A4 cards don't have to match height exactly.
const CARD_CLASSNAME = "w-full md:flex-1 md:max-h-[85vh] md:overflow-y-auto";

export function Part7DoubleScreen({ page, nav }: { page: ReadingPageDef; nav: UseToeicNavResult }) {
  const set = page.set!;
  const [passage1, passage2] = set.passages;

  return (
    <div className="flex flex-col md:flex-row gap-6 max-w-[1400px] mx-auto">
      <PaperCard className={CARD_CLASSNAME}>
        <p className="text-[12px] font-semibold text-[#444] mb-3">{setReferenceLabel(set)}</p>
        <PassagePane passage={passage1} />
        <hr className="border-t border-black/15 my-6" />
        <PassagePane passage={passage2} />
      </PaperCard>

      <PaperCard className={CARD_CLASSNAME}>
        <QuestionColumns
          questionIds={set.questionIds}
          nav={nav}
          className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6"
        />
      </PaperCard>
    </div>
  );
}
