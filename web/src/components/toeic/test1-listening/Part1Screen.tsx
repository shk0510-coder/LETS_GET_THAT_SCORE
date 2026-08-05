import { Choice, getAudioItem, getQuestion, PageDef } from "@/data/toeic/test1/listening";
import { UseToeicAudioResult } from "./hooks/useToeicAudio";
import { UseToeicNavResult } from "./hooks/useToeicNav";
import { SpeakerButton } from "./SpeakerButton";
import { ImagePlaceholder } from "./ImagePlaceholder";

const CHOICE_LETTERS: Choice[] = ["A", "B", "C", "D"];

export function Part1Screen({
  page,
  audio,
  nav,
}: {
  page: PageDef;
  audio: UseToeicAudioResult;
  nav: UseToeicNavResult;
}) {
  return (
    <div className="flex flex-col gap-16">
      {page.questionIds.map((questionId, i) => {
        const question = getQuestion(questionId);
        const audioItem = getAudioItem(page.audioIds[i]);
        if (!question) return null;
        const selected = nav.answers[questionId];

        return (
          <div key={questionId} className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4">
            <div className="flex items-center gap-3 sm:flex-col sm:pt-1 sm:shrink-0">
              {audioItem && (
                <SpeakerButton item={audioItem} audio={audio} label={`Play question ${questionId}`} />
              )}
              <p className="font-bold text-lg sm:hidden">{questionId}.</p>
            </div>

            <div className="flex-1 flex flex-col items-center w-full">
              <div className="w-full sm:max-w-[60%]">
                <p className="hidden sm:block font-bold text-lg mb-1">{questionId}.</p>
                <ImagePlaceholder
                  src={question.photoSrc ?? ""}
                  alt={`Question ${questionId} photograph`}
                  aspectClassName="aspect-[3/2]"
                  className="w-full"
                />
              </div>

              <div className="flex items-center gap-6 sm:gap-8 mt-4">
                {CHOICE_LETTERS.map((letter) => {
                  const isSelected = selected === letter;
                  return (
                    <button
                      key={letter}
                      type="button"
                      onClick={() => nav.setAnswer(questionId, letter)}
                      className={`flex h-9 min-w-9 items-center justify-center rounded-full border-2 px-2 text-[15px] font-semibold transition-colors ${
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
          </div>
        );
      })}
    </div>
  );
}
