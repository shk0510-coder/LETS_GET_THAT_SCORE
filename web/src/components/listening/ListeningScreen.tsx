import { Button } from "@/components/ui";
import { AudioItemState, NormalizedQuestion } from "./state";
import { SpeakerVisual } from "./SpeakerVisual";

export function ListeningScreen({
  visual,
  instruction,
  question,
  audioState,
  selectedIndex,
  onSelect,
  onPlayFallback,
}: {
  visual: string;
  instruction: string;
  question: NormalizedQuestion;
  audioState: AudioItemState;
  selectedIndex: number | null;
  onSelect: (index: number) => void;
  onPlayFallback: () => void;
}) {
  const unlocked = audioState.played && audioState.finished;

  return (
    <div className="flex flex-col md:flex-row gap-6 items-stretch">
      <div className="flex md:w-72 shrink-0 items-center justify-center border border-outline-variant bg-surface-container-lowest p-6">
        <SpeakerVisual type={visual} />
      </div>

      <div className="flex-1 flex flex-col gap-6">
        <div className="border border-outline-variant bg-surface-container-lowest p-6">
          <span className="inline-block rounded-full bg-secondary-container px-3 py-1 text-label-md text-on-secondary-container mb-4">
            {instruction}
          </span>

          <p className="text-body-sm text-on-surface-variant">
            {audioState.playing ? (
              <span className="font-semibold text-primary">Audio is playing…</span>
            ) : unlocked ? (
              <span className="font-semibold text-on-surface-variant">
                Audio completed. It cannot be replayed.
              </span>
            ) : audioState.blocked ? (
              <span className="font-semibold text-error">
                Autoplay was blocked. Press the button below once.
              </span>
            ) : (
              "Audio will start automatically."
            )}
          </p>

          {(!audioState.played || audioState.blocked) && (
            <Button
              variant="secondary"
              className="mt-4"
              onClick={onPlayFallback}
              disabled={audioState.playing}
            >
              Play Audio
            </Button>
          )}
        </div>

        <div className="border border-outline-variant bg-surface-container-low p-6">
          <p className="text-label-md text-on-surface-variant mb-2">
            Question {question.number}
          </p>
          <p className="text-body-lg font-semibold text-on-surface mb-6">{question.text}</p>
          <div className="flex flex-col gap-3">
            {question.choices.map((choice, i) => {
              const isSelected = selectedIndex === i;
              return (
                <button
                  key={i}
                  type="button"
                  disabled={!unlocked}
                  onClick={() => onSelect(i)}
                  className={`flex items-start gap-3 p-3 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                    isSelected
                      ? "border-2 border-primary bg-secondary-container"
                      : "border border-outline-variant bg-surface-container-lowest enabled:hover:border-primary"
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
    </div>
  );
}
