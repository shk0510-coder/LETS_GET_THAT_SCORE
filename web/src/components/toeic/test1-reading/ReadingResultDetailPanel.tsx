import { Icon } from "@/components/ui";
import { Choice, ReadingQuestion, ReadingQuestionSet } from "@/data/toeic/test1/reading";
import { PassagePane } from "./PassagePane";

const CHOICE_LETTERS: Choice[] = ["A", "B", "C", "D"];

export function ReadingResultDetailPanel({
  question,
  set,
  status,
  userAnswer,
  onClose,
}: {
  question: ReadingQuestion;
  set: ReadingQuestionSet | undefined;
  status: "correct" | "wrong" | "unanswered" | null;
  userAnswer: Choice | undefined;
  onClose: () => void;
}) {
  return (
    <div className="border border-outline-variant bg-surface-container-lowest p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-label-md text-on-surface-variant">Question {question.id}</span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close detail panel"
          className="md:hidden text-on-surface-variant"
        >
          <Icon name="close" className="text-[20px]" />
        </button>
      </div>

      {status && (
        <span
          className={`self-start text-label-md px-3 py-1 rounded-full ${
            status === "correct"
              ? "bg-secondary-container text-on-secondary-container"
              : status === "wrong"
                ? "bg-error-container text-on-error-container"
                : "bg-surface-container text-on-surface-variant"
          }`}
        >
          {status === "correct" ? "Correct" : status === "wrong" ? "Incorrect" : "Not answered"}
        </span>
      )}

      {set && set.passages.length > 0 && (
        <div className="flex flex-col gap-3 max-h-[280px] overflow-y-auto">
          {set.passages.map((p) => (
            <PassagePane key={p.passageId} passage={p} />
          ))}
        </div>
      )}

      {question.promptText && <p className="text-body-sm text-on-surface">{question.promptText}</p>}

      <ul className="flex flex-col gap-1 text-body-sm text-on-surface-variant">
        {question.options.map((text, i) => (
          <li key={CHOICE_LETTERS[i]}>
            ({CHOICE_LETTERS[i]}) {text}
          </li>
        ))}
      </ul>

      <p className="text-body-sm text-on-surface-variant">
        <b>Your answer:</b> {userAnswer ?? <i>(no answer)</i>}
      </p>
      <p className="text-body-sm text-on-surface-variant">
        <b>Correct answer:</b> {question.answer}
      </p>

      {question.explanation && (
        <div>
          <p className="text-label-md text-on-surface-variant mb-1">Explanation</p>
          <p className="text-body-sm text-on-surface whitespace-pre-line">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}
