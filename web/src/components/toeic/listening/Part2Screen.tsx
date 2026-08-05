import { Icon } from "@/components/ui";
import { AudioBar } from "./AudioBar";

const CHOICES = ["A", "B", "C"];
const QUESTION_NUMBERS = Array.from({ length: 25 }, (_, i) => i + 7);

export function Part2Screen({
  answers,
  onAnswer,
  onNext,
}: {
  answers: Record<number, string>;
  onAnswer: (questionNumber: number, choice: string) => void;
  onNext: () => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      <AudioBar label="Questions 7–31" />

      <div className="border border-outline-variant divide-y divide-outline-variant">
        {QUESTION_NUMBERS.map((questionNumber) => {
          const selected = answers[questionNumber];
          return (
            <div
              key={questionNumber}
              id={`q-${questionNumber}`}
              className="flex items-center gap-4 px-4 py-3"
            >
              <span className="w-10 shrink-0 text-body-lg font-bold text-primary">
                {questionNumber}
              </span>
              <div className="flex gap-2">
                {CHOICES.map((letter) => {
                  const isSelected = selected === letter;
                  return (
                    <button
                      key={letter}
                      type="button"
                      onClick={() => onAnswer(questionNumber, letter)}
                      className={`flex h-9 w-9 items-center justify-center rounded-full text-body-sm font-bold transition-colors ${
                        isSelected
                          ? "border-2 border-primary bg-secondary-container text-primary"
                          : "border border-outline-variant text-on-surface hover:border-primary"
                      }`}
                    >
                      {letter}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-2 bg-primary-container text-on-primary hover:bg-primary border border-primary-container rounded px-8 py-3 text-label-md uppercase tracking-wider transition-colors"
        >
          Next: Part III
          <Icon name="arrow_forward" className="text-[18px]" />
        </button>
      </div>
    </div>
  );
}
