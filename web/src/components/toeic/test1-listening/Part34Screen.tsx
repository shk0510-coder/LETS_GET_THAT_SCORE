import { Choice, getAudioItem, getQuestion, PageDef, PageSet } from "@/data/toeic/test1/listening";
import { UseToeicAudioResult } from "./hooks/useToeicAudio";
import { UseToeicNavResult } from "./hooks/useToeicNav";
import { SpeakerButton } from "./SpeakerButton";
import { ImagePlaceholder } from "./ImagePlaceholder";

const CHOICE_LETTERS: Choice[] = ["A", "B", "C", "D"];

const DIRECTIONS: Record<3 | 4, { title: string; body: string }> = {
  3: {
    title: "PART 3",
    body: "In this part, you will listen to a series of conversations involving two or more speakers. After each conversation, you will be asked three questions about what was discussed. Click (A), (B), (C), or (D) to select the best answer to each question. The conversations will not appear as text on your screen and will be played only once.",
  },
  4: {
    title: "PART 4",
    body: "In this part, you will listen to a series of short talks, each delivered by a single speaker. After each talk, you will be asked three questions about its content. Click (A), (B), (C), or (D) to select the best answer to each question. The talks will not appear as text on your screen and will be played only once.",
  },
};

export function Part34Screen({
  page,
  audio,
  nav,
}: {
  page: PageDef;
  audio: UseToeicAudioResult;
  nav: UseToeicNavResult;
}) {
  const sets = page.sets ?? [];
  const half = Math.ceil(sets.length / 2);
  const leftSets = sets.slice(0, half);
  const rightSets = sets.slice(half);
  const directions = page.part === 3 || page.part === 4 ? DIRECTIONS[page.part] : null;

  const firstId = page.questionIds[0];
  const lastId = page.questionIds[page.questionIds.length - 1];
  const pageRangeLabel = `Questions ${firstId}–${lastId}`;
  const directionsAudio = page.showDirections ? getAudioItem(page.audioIds[0]) : undefined;
  const questionsAudio = getAudioItem(page.showDirections ? page.audioIds[1] : page.audioIds[0]);

  return (
    <div className="flex flex-col">
      {page.showDirections && directions ? (
        <div className="border border-black/20 px-4 py-3 mb-6 flex items-start gap-4">
          {directionsAudio && (
            <SpeakerButton
              item={directionsAudio}
              audio={audio}
              size="sm"
              label={`Play ${directions.title} directions`}
            />
          )}
          <div className="flex-1">
            <p className="font-bold text-sm mb-1">{directions.title}</p>
            <p className="text-[13px] leading-relaxed">
              <span className="font-semibold">Directions:</span> {directions.body}
            </p>
          </div>
          {questionsAudio && (
            <div className="flex flex-col items-center gap-1 shrink-0">
              <SpeakerButton
                item={questionsAudio}
                audio={audio}
                size="sm"
                label={`Play ${pageRangeLabel}`}
              />
              <span className="text-[10px] font-semibold text-[#666] text-center">
                Q{firstId}–{lastId}
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-3 mb-6">
          {questionsAudio && (
            <SpeakerButton
              item={questionsAudio}
              audio={audio}
              size="sm"
              label={`Play ${pageRangeLabel}`}
            />
          )}
          <p className="text-xs font-semibold text-[#666]">{pageRangeLabel}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
        <div className="flex flex-col divide-y divide-dotted divide-black/30">
          {leftSets.map((set) => (
            <div key={set.questionIds[0]} className="py-6 first:pt-0">
              <SetBlock set={set} nav={nav} />
            </div>
          ))}
        </div>
        <div className="flex flex-col divide-y divide-dotted divide-black/30">
          {rightSets.map((set) => (
            <div key={set.questionIds[0]} className="py-6 first:pt-0">
              <SetBlock set={set} nav={nav} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SetBlock({ set, nav }: { set: PageSet; nav: UseToeicNavResult }) {
  const rangeLabel = `Questions ${set.questionIds[0]}–${set.questionIds[set.questionIds.length - 1]}`;

  return (
    <div className="flex flex-col gap-4">
      {set.graphicSrc && (
        <ImagePlaceholder
          src={set.graphicSrc}
          alt={`${rangeLabel} graphic`}
          aspectClassName="aspect-[4/3]"
          className="w-full"
        />
      )}

      <div className="flex flex-col gap-5">
        {set.questionIds.map((questionId) => {
          const question = getQuestion(questionId);
          if (!question) return null;
          const selected = nav.answers[questionId];

          return (
            <div key={questionId}>
              <p className="text-[15px] mb-2">
                <span className="font-semibold">{questionId}.</span> {question.promptText}
              </p>
              <div className="flex flex-col gap-1">
                {(question.options ?? []).map((optionText, i) => {
                  const letter = CHOICE_LETTERS[i];
                  const isSelected = selected === letter;
                  return (
                    <button
                      key={letter}
                      type="button"
                      onClick={() => nav.setAnswer(questionId, letter)}
                      className={`flex items-start gap-1.5 rounded px-1.5 py-1 text-left text-[14px] transition-colors ${
                        isSelected
                          ? "bg-gold-container/60 text-[#1a1a1a] font-semibold"
                          : "text-[#1a1a1a] hover:bg-black/5"
                      }`}
                    >
                      <span>({letter})</span>
                      <span>{optionText}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
