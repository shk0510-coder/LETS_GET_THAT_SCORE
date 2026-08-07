import { Choice, ReadingQuestion } from "@/data/toeic/test1/reading";

const CHOICE_LETTERS: Choice[] = ["A", "B", "C", "D"];

export function ReadingQuestionBlock({
  questionId,
  question,
  selected,
  onSelect,
}: {
  questionId: number;
  question: ReadingQuestion;
  selected: Choice | undefined;
  onSelect: (choice: Choice) => void;
}) {
  return (
    <div>
      <p className="text-[15px] mb-2">
        <span className="font-semibold">{questionId}.</span>
        {question.promptText ? ` ${question.promptText}` : ""}
      </p>
      <div className="flex flex-col gap-1">
        {CHOICE_LETTERS.map((letter, i) => {
          const isSelected = selected === letter;
          return (
            <button
              key={letter}
              type="button"
              onClick={() => onSelect(letter)}
              className={`flex items-start gap-1.5 rounded px-1.5 py-1 text-left text-[14px] transition-colors ${
                isSelected
                  ? "bg-gold-container/60 text-[#1a1a1a] font-semibold"
                  : "text-[#1a1a1a] hover:bg-black/5"
              }`}
            >
              <span>({letter})</span>
              <span>{question.options[i]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
