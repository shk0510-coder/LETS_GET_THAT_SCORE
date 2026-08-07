import { getQuestion, ReadingPageDef } from "@/data/toeic/test1/reading";
import { UseToeicNavResult } from "../test1-listening/hooks/useToeicNav";
import { PassagePane } from "./PassagePane";
import { ReadingQuestionBlock } from "./ReadingQuestionBlock";

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PassagePane passage={passage} className="md:max-h-[520px] md:overflow-y-auto" />

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
      </div>
    </div>
  );
}
