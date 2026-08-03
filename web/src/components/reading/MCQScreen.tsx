import { MCQQuestion } from "@/data/reading/types";

export function MCQScreen({
  stimulusLabel,
  stimulusText,
  question,
  selectedIndex,
  onSelect,
}: {
  stimulusLabel: string;
  stimulusText: string;
  question: MCQQuestion;
  selectedIndex: number | null;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
      <div className="border border-outline-variant bg-surface-container-lowest p-6">
        <span className="inline-block rounded-full bg-secondary-container px-3 py-1 text-label-md text-on-secondary-container mb-4">
          {stimulusLabel}
        </span>
        <div className="text-body-md text-on-surface leading-relaxed whitespace-pre-wrap">
          {stimulusText}
        </div>
      </div>

      <div className="border border-outline-variant bg-surface-container-low p-6">
        <p className="text-label-md text-on-surface-variant mb-2">
          Question {question.number}
        </p>
        <p className="text-body-lg font-semibold text-on-surface mb-6">
          {question.question}
        </p>
        <div className="flex flex-col gap-3">
          {question.choices.map((choice, i) => {
            const isSelected = selectedIndex === i;
            return (
              <button
                key={i}
                type="button"
                onClick={() => onSelect(i)}
                className={`flex items-start gap-3 p-3 text-left transition-colors ${
                  isSelected
                    ? "border-2 border-primary bg-secondary-container"
                    : "border border-outline-variant bg-surface-container-lowest hover:border-primary"
                }`}
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded border border-outline-variant text-body-sm font-bold text-on-surface">
                  {"ABCD"[i]}
                </span>
                <span className="text-body-md text-on-surface">{choice}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
