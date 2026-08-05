import { Choice, getAudioItem, getQuestion, PageDef, PageSet } from "@/data/toeic/test1/listening";
import { UseToeicAudioResult } from "./hooks/useToeicAudio";
import { UseToeicNavResult } from "./hooks/useToeicNav";
import { SpeakerButton } from "./SpeakerButton";
import { ImagePlaceholder } from "./ImagePlaceholder";

const CHOICE_LETTERS: Choice[] = ["A", "B", "C", "D"];

const DIRECTIONS: Record<3 | 4, { title: string; body: string }> = {
  3: {
    title: "PART 3",
    body: "For each conversation in this part, you will hear two or three people speaking about a topic. After the conversation, you will read a question and four possible answers. Choose the answer that best fits what you heard, based only on what is stated or implied in the conversation. Some conversations include a graphic — use both the audio and the graphic to answer the related question. Each conversation is spoken only once.",
  },
  4: {
    title: "PART 4",
    body: "For each talk in this part, you will hear a short monologue given by a single speaker. After the talk, you will read a question and four possible answers. Choose the answer that best fits what you heard, based only on what is stated or implied in the talk. Some talks include a graphic — use both the audio and the graphic to answer the related question. Each talk is spoken only once.",
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

  return (
    <div className="flex flex-col">
      {page.showDirections && directions && (
        <div className="border border-black/20 px-4 py-3 mb-6">
          <p className="font-bold text-sm mb-1">{directions.title}</p>
          <p className="text-[13px] leading-relaxed">{directions.body}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
        <div className="flex flex-col divide-y divide-dotted divide-black/30">
          {leftSets.map((set) => (
            <div key={set.audioId} className="py-6 first:pt-0">
              <SetBlock set={set} audio={audio} nav={nav} />
            </div>
          ))}
        </div>
        <div className="flex flex-col divide-y divide-dotted divide-black/30">
          {rightSets.map((set) => (
            <div key={set.audioId} className="py-6 first:pt-0">
              <SetBlock set={set} audio={audio} nav={nav} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SetBlock({
  set,
  audio,
  nav,
}: {
  set: PageSet;
  audio: UseToeicAudioResult;
  nav: UseToeicNavResult;
}) {
  const audioItem = getAudioItem(set.audioId);
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

      <div className="flex items-center gap-3">
        {audioItem && (
          <SpeakerButton item={audioItem} audio={audio} size="sm" label={`Play ${rangeLabel}`} />
        )}
        <p className="text-xs font-semibold text-[#666]">{rangeLabel}</p>
      </div>

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
