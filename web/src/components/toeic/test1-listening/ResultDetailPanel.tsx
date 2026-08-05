import { Icon } from "@/components/ui";
import { AudioItem, Choice, Question } from "@/data/toeic/test1/listening";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { UseReplayAudioResult } from "./hooks/useReplayAudio";

const CHOICE_LETTERS: Choice[] = ["A", "B", "C", "D"];

export function ResultDetailPanel({
  question,
  status,
  userAnswer,
  audioItem,
  replay,
  onClose,
}: {
  question: Question;
  status: "correct" | "wrong" | "unanswered" | null;
  userAnswer: Choice | undefined;
  audioItem: AudioItem | undefined;
  replay: UseReplayAudioResult;
  onClose: () => void;
}) {
  const isPlaying = audioItem ? replay.playingId === audioItem.id : false;

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

      {question.photoSrc && (
        <ImagePlaceholder
          src={question.photoSrc}
          alt={`Question ${question.id} photograph`}
          aspectClassName="aspect-[3/2]"
          className="w-full"
        />
      )}
      {question.graphicSrc && (
        <ImagePlaceholder
          src={question.graphicSrc}
          alt={`Question ${question.id} graphic`}
          aspectClassName="aspect-[4/3]"
          className="w-full"
        />
      )}

      {question.promptText && <p className="text-body-sm text-on-surface">{question.promptText}</p>}

      {question.options && (
        <ul className="flex flex-col gap-1 text-body-sm text-on-surface-variant">
          {question.options.map((text, i) => (
            <li key={CHOICE_LETTERS[i]}>
              ({CHOICE_LETTERS[i]}) {text}
            </li>
          ))}
        </ul>
      )}

      <p className="text-body-sm text-on-surface-variant">
        <b>Your answer:</b> {userAnswer ?? <i>(no answer)</i>}
      </p>
      <p className="text-body-sm text-on-surface-variant">
        <b>Correct answer:</b> {question.answer}
      </p>

      {audioItem && (
        <button
          type="button"
          onClick={() => replay.play(audioItem.id, audioItem.src)}
          disabled={isPlaying}
          className={`self-start flex items-center gap-2 text-label-md px-4 py-2 rounded-full border transition-colors ${
            isPlaying
              ? "border-gold bg-gold-container text-on-gold-container animate-pulse"
              : "border-primary text-primary hover:bg-secondary-container"
          }`}
        >
          <Icon name={isPlaying ? "graphic_eq" : "volume_up"} className="text-[18px]" />
          {isPlaying ? "Playing…" : "다시 듣기"}
        </button>
      )}

      {question.script && (
        <div>
          <p className="text-label-md text-on-surface-variant mb-1">Script</p>
          <p className="text-body-sm text-on-surface whitespace-pre-line">{question.script}</p>
        </div>
      )}

      {question.explanation && (
        <div>
          <p className="text-label-md text-on-surface-variant mb-1">Explanation</p>
          <p className="text-body-sm text-on-surface whitespace-pre-line">{question.explanation}</p>
        </div>
      )}

      {status === "wrong" && userAnswer && (
        <div>
          <p className="text-label-md text-on-surface-variant mb-1">Why your answer was wrong</p>
          <p className="text-body-sm text-on-surface whitespace-pre-line">
            {question.optionExplanations?.[userAnswer] ?? "[오답 해설은 실제 데이터 연결 후 채워질 예정입니다]"}
          </p>
        </div>
      )}
    </div>
  );
}
