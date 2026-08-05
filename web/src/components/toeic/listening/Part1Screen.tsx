import { Icon } from "@/components/ui";
import { AudioBar } from "./AudioBar";

const CHOICES = ["A", "B", "C", "D"];

export function Part1Screen({
  index,
  answers,
  onAnswer,
  onNext,
}: {
  index: number;
  answers: Record<number, string>;
  onAnswer: (questionNumber: number, choice: string) => void;
  onNext: () => void;
}) {
  const questionNumber = index + 1;
  const selected = answers[questionNumber];
  const isLast = index === 5;

  return (
    <div className="flex flex-col items-center gap-6">
      <p className="text-label-md text-on-surface-variant uppercase tracking-widest">
        Question {questionNumber} of 6
      </p>

      <div className="w-full max-w-xl aspect-video flex items-center justify-center border border-outline-variant bg-surface-container-low text-body-lg text-on-surface-variant">
        📷 사진 준비 중
      </div>

      <div className="w-full max-w-xl">
        <AudioBar />
      </div>

      <div className="w-full max-w-xl grid grid-cols-4 gap-3">
        {CHOICES.map((letter) => {
          const isSelected = selected === letter;
          return (
            <button
              key={letter}
              type="button"
              onClick={() => onAnswer(questionNumber, letter)}
              className={`flex items-center justify-center h-14 text-headline-md font-bold transition-colors ${
                isSelected
                  ? "border-2 border-primary bg-secondary-container text-primary"
                  : "border border-outline-variant bg-surface-container-lowest hover:border-primary text-on-surface"
              }`}
            >
              {letter}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={onNext}
        className="inline-flex items-center gap-2 bg-primary-container text-on-primary hover:bg-primary border border-primary-container rounded px-8 py-3 text-label-md uppercase tracking-wider transition-colors"
      >
        {isLast ? "Next: Part II" : "Next"}
        <Icon name="arrow_forward" className="text-[18px]" />
      </button>
    </div>
  );
}
