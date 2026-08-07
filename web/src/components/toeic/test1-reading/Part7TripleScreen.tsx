import { getQuestion, ReadingPageDef } from "@/data/toeic/test1/reading";
import { PaperCard } from "../test1-listening/PaperCard";
import { UseToeicNavResult } from "../test1-listening/hooks/useToeicNav";
import { PassagePane } from "./PassagePane";
import { ReadingQuestionBlock } from "./ReadingQuestionBlock";

const CARD_CLASSNAME = "w-full md:flex-1 md:max-h-[85vh] md:overflow-y-auto";

export function Part7TripleScreen({ page, nav }: { page: ReadingPageDef; nav: UseToeicNavResult }) {
  const set = page.set!;
  const [passage1, passage2, passage3] = set.passages;

  return (
    <div className="flex flex-col md:flex-row gap-6 max-w-[1400px] mx-auto">
      <PaperCard className={CARD_CLASSNAME}>
        <PassagePane passage={passage1} />
        <hr className="border-t border-black/15 my-6" />
        <PassagePane passage={passage2} />
      </PaperCard>

      <PaperCard className={CARD_CLASSNAME}>
        <PassagePane passage={passage3} />
        <hr className="border-t border-black/15 my-6" />
        <div className="flex flex-col gap-6">
          {set.questionIds.map((questionId) => {
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
          })}
        </div>
      </PaperCard>
    </div>
  );
}
