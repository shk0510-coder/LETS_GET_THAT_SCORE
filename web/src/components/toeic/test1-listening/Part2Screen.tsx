import { Choice, getAudioItem, PageDef } from "@/data/toeic/test1/listening";
import { UseToeicAudioResult } from "./hooks/useToeicAudio";
import { UseToeicNavResult } from "./hooks/useToeicNav";
import { SpeakerButton } from "./SpeakerButton";

const CHOICE_LETTERS: Choice[] = ["A", "B", "C"];
const LEFT_COLUMN_END = 19; // Q7–19 left, Q20–31 right

export function Part2Screen({
  page,
  audio,
  nav,
}: {
  page: PageDef;
  audio: UseToeicAudioResult;
  nav: UseToeicNavResult;
}) {
  const leftIds = page.questionIds.filter((id) => id <= LEFT_COLUMN_END);
  const rightIds = page.questionIds.filter((id) => id > LEFT_COLUMN_END);
  const audioItem = getAudioItem(page.audioIds[0]);

  function renderQuestion(questionId: number) {
    const selected = nav.answers[questionId];

    return (
      <div key={questionId}>
        <p className="text-[15px]">
          <span className="font-semibold">{questionId}.</span> Select the best response.
        </p>
        <div className="flex items-center gap-5 mt-2">
          {CHOICE_LETTERS.map((letter) => {
            const isSelected = selected === letter;
            return (
              <button
                key={letter}
                type="button"
                onClick={() => nav.setAnswer(questionId, letter)}
                className={`flex h-8 min-w-8 items-center justify-center rounded-full border-2 px-1.5 text-[14px] font-semibold transition-colors ${
                  isSelected
                    ? "border-gold bg-gold-container/60 text-[#1a1a1a]"
                    : "border-transparent text-[#1a1a1a] hover:bg-black/5"
                }`}
              >
                ({letter})
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="border border-black/20 px-4 py-3 mb-6 flex items-start gap-4">
        {audioItem && (
          <SpeakerButton
            item={audioItem}
            audio={audio}
            size="sm"
            label="Play Part 2 directions and questions 7 through 31"
          />
        )}
        <div>
          <p className="font-bold text-sm mb-1">PART 2</p>
          <p className="text-[13px] leading-relaxed">
            <span className="font-semibold">Directions:</span> In this part, you will hear a question or
            statement followed by three possible responses, all spoken in English. Neither the question nor
            the responses will appear as text on your screen, and each will be played only once. Listen
            carefully and click (A), (B), or (C) to select the response that best answers the question or
            fits the statement.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-7">
        <div className="flex flex-col gap-7">{leftIds.map(renderQuestion)}</div>
        <div className="flex flex-col gap-7">{rightIds.map(renderQuestion)}</div>
      </div>
    </div>
  );
}
