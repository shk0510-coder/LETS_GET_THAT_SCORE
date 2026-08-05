import Link from "next/link";
import { BackLink, Container, Icon, SiteFooter } from "@/components/ui";
import { TOEFL_PROMPT_VIDEO_IDS } from "@/lib/content";
import { WritingAnswerBox } from "./WritingAnswerBox";
import { SpeakingRecorder } from "./SpeakingRecorder";

export function TestPlayer({
  skillLabel,
  testNumber,
  sectionHref,
}: {
  skillLabel: "Speaking" | "Writing";
  testNumber: number;
  sectionHref: string;
}) {
  const instructions =
    skillLabel === "Speaking"
      ? "Watch the prompt, then record your own response."
      : "Watch the prompt, then write your own response.";

  const skillKey = skillLabel.toLowerCase() as "writing" | "speaking";
  const videoId =
    TOEFL_PROMPT_VIDEO_IDS[skillKey][testNumber] ??
    TOEFL_PROMPT_VIDEO_IDS[skillKey][1];

  return (
    <div className="flex flex-col flex-1">
      <header className="w-full bg-surface border-b border-outline-variant">
        <Container className="h-16 flex items-center gap-4">
          <BackLink href={sectionHref} label="Back" />
          <h1 className="text-headline-md font-bold text-primary">
            {skillLabel} — Test {testNumber}
          </h1>
        </Container>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-10 py-16">
        <Container className="max-w-3xl">
          <div className="w-full relative aspect-video rounded-lg border-2 border-primary-container overflow-hidden bg-primary">
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}`}
              title={`${skillLabel} Test ${testNumber} prompt video`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="mt-16 w-full flex flex-col items-center text-center">
            <div className="flex items-center gap-2 mb-4">
              <Icon name="info" className="text-primary text-xl" />
              <h2 className="text-label-md text-primary uppercase tracking-widest">
                Task Instructions
              </h2>
            </div>
            <p className="text-body-lg text-secondary leading-relaxed max-w-2xl">
              {instructions} This section is{" "}
              <span className="font-semibold text-primary">self-graded</span>{" "}
              — no automatic scoring.
            </p>
          </div>

          {skillLabel === "Writing" ? (
            <WritingAnswerBox testNumber={testNumber} />
          ) : (
            <SpeakingRecorder testNumber={testNumber} />
          )}

          <div className="mt-16 w-full flex flex-col items-center text-center">
            <div className="w-12 h-1 bg-accent-gold rounded-full mb-8" />
            <Link
              href={sectionHref}
              className="group flex items-center gap-4 bg-primary text-on-primary px-10 py-4 rounded-lg text-headline-md transition-all hover:bg-primary-container active:scale-95"
            >
              Finish
              <Icon
                name="arrow_forward"
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </Container>
      </main>

      <SiteFooter siteName="Let's get that 120" />
    </div>
  );
}
