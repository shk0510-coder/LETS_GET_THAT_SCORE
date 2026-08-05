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
        In the Listening section, you will show how well you understand spoken English by answering four
        types of questions. Each question is based on audio that plays only once. For every question, choose
        the best answer from the choices given and mark it on your answer sheet. Except where noted below,
        none of the questions or answer choices are printed in this section.
      </p>

      <hr className="border-t border-black/15 my-6" />

      <h3 className="text-lg font-bold mb-3">PART 1</h3>
      <p className="text-[15px] leading-relaxed mb-6">
        For each item in this part, you will look at a photograph while you listen to four short statements
        about it. Decide which statement best describes what is shown in the photograph, then select answer
        (A), (B), (C), or (D). The statements are spoken only once and are not printed in your test book.
      </p>

      <p className="font-semibold mb-3">Example:</p>
      <div className="flex flex-col items-start gap-3">
        <ImagePlaceholder
          src="/toeic/test1/part1/example.jpg"
          alt="Example photograph"
          aspectClassName="aspect-[3/2]"
          className="w-full max-w-md"
        />
        <p className="text-[15px] leading-relaxed">
          In the photograph, a man is typing at a desk. Statement (C) best describes this action, so (C) is
          the correct response.
        </p>
      </div>
    </div>
  );
}
