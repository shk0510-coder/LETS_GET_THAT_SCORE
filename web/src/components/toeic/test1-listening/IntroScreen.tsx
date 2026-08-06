import { getAudioItem, PageDef } from "@/data/toeic/test1/listening";
import { UseToeicAudioResult } from "./hooks/useToeicAudio";
import { SpeakerButton } from "./SpeakerButton";
import { ImagePlaceholder } from "./ImagePlaceholder";

export function IntroScreen({ page, audio }: { page: PageDef; audio: UseToeicAudioResult }) {
  const directionsItem = getAudioItem(page.audioIds[0]);

  return (
    <div className="border border-black/25 px-6 py-6 sm:px-8 sm:py-8">
      <div className="flex items-center gap-3 mb-4">
        {directionsItem && (
          <SpeakerButton item={directionsItem} audio={audio} label="Play Listening Test directions" />
        )}
        <h2 className="text-2xl font-bold tracking-wide">LISTENING TEST</h2>
      </div>

      <p className="text-[15px] leading-relaxed mb-6">
        This test is designed to assess your ability to understand spoken English in a variety of everyday
        and professional contexts. The Listening test consists of four parts and runs for approximately 45
        minutes. Each part begins with its own set of directions. For all questions, select your answer by
        clicking the choice that best matches what you hear — no separate answer sheet is required.
      </p>

      <hr className="border-t border-black/15 my-6" />

      <h3 className="text-lg font-bold mb-3">PART 1</h3>
      <p className="text-[15px] leading-relaxed mb-6">
        <span className="font-semibold">Directions:</span> Each question in this part features a photograph
        displayed on your screen. You will hear four short statements, each describing the photograph in a
        different way. Your task is to identify the statement that most accurately reflects what is shown in
        the image, then click (A), (B), (C), or (D) to record your answer. Please note that the statements
        are audio-only and will not appear as text on your screen. Each set of statements will be played
        once.
      </p>

      <p className="font-semibold mb-3">Example:</p>
      <div className="flex flex-col items-center gap-3">
        <ImagePlaceholder
          src="/toeic/test1/part1/example.jpg"
          alt="Example photograph"
          aspectClassName="aspect-[3/2]"
          className="w-full max-w-md mx-auto"
        />
        <p className="text-[15px] leading-relaxed">
          In the example above, option (A) provides the most accurate description of the photograph and is
          therefore the correct answer.
        </p>
      </div>
    </div>
  );
}
