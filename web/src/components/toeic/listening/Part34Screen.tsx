import Link from "next/link";
import { Icon } from "@/components/ui";
import { ToeicSet } from "@/data/toeic/listening/test1";
import { AudioBar } from "./AudioBar";

const CHOICES = ["A", "B", "C", "D"];

export function Part34Screen({
  part,
  set,
  setIndex,
  totalSets,
  answers,
  onAnswer,
  onNext,
  finishHref,
}: {
  part: 3 | 4;
  set: ToeicSet;
  setIndex: number;
  totalSets: number;
  answers: Record<number, string>;
  onAnswer: (questionNumber: number, choice: string) => void;
  onNext: () => void;
  finishHref?: string;
}) {
  const isLast = setIndex === totalSets - 1;
  const rangeLabel = `Questions ${set.startNumber}-${set.startNumber + 2}`;
  const nextLabel = isLast ? (part === 3 ? "Next: Part IV" : "Finish") : "Next Set";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <span className="inline-block rounded-full bg-secondary-container px-4 py-1.5 text-label-md text-on-secondary-container">
          {rangeLabel}
        </span>
        <span className="text-body-sm text-on-surface-variant">
          Set {setIndex + 1} of {totalSets}
        </span>
      </div>

      <AudioBar label={rangeLabel} />

      {set.hasDiagram && (
        <div className="aspect-video w-full flex items-center justify-center border border-outline-variant bg-surface-container-low text-body-lg text-on-surface-variant">
          📊 다이어그램 준비 중
        </div>
      )}

      {set.questions ? (
        <div className="flex flex-col gap-6">
          {set.questions.map((question) => {
            const selected = answers[question.number];
            return (
              <div
                key={question.number}
                id={`q-${question.number}`}
                className="border border-outline-variant bg-surface-container-lowest p-6"
              >
                <p className="text-label-md text-on-surface-variant mb-2">
                  Question {question.number}
                </p>
                <p className="text-body-lg font-semibold text-on-surface mb-4">
                  {question.prompt}
                </p>
                <div className="flex flex-col gap-3">
                  {question.choices.map((choice, i) => {
                    const letter = CHOICES[i];
                    const isSelected = selected === letter;
                    return (
                      <button
                        key={letter}
                        type="button"
                        onClick={() => onAnswer(question.number, letter)}
                        className={`flex items-start gap-3 p-3 text-left transition-colors ${
                          isSelected
                            ? "border-2 border-primary bg-secondary-container"
                            : "border border-outline-variant bg-surface-container-lowest hover:border-primary"
                        }`}
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded border border-outline-variant text-body-sm font-bold text-on-surface">
                          {letter}
                        </span>
                        <span className="text-body-md text-on-surface">{choice}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="border border-outline-variant bg-surface-container-low p-10 text-center text-body-md text-on-surface-variant">
          🛠️ 이 세트는 아직 준비 중입니다.
        </div>
      )}

      <div className="flex justify-center">
        {isLast && part === 4 && finishHref ? (
          <Link
            href={finishHref}
            className="inline-flex items-center gap-2 bg-primary text-on-primary px-8 py-3 rounded text-label-md uppercase tracking-wider transition-colors hover:bg-primary-container"
          >
            {nextLabel}
            <Icon name="arrow_forward" className="text-[18px]" />
          </Link>
        ) : (
          <button
            type="button"
            onClick={onNext}
            className="inline-flex items-center gap-2 bg-primary-container text-on-primary hover:bg-primary border border-primary-container rounded px-8 py-3 text-label-md uppercase tracking-wider transition-colors"
          >
            {nextLabel}
            <Icon name="arrow_forward" className="text-[18px]" />
          </button>
        )}
      </div>
    </div>
  );
}
