import Link from "next/link";
import { BackLink, Container, Icon, SiteFooter } from "@/components/ui";

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
          <div
            className="w-full relative aspect-video rounded-lg border-2 border-primary-container overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #00113a 0%, #002366 100%)",
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-surface/10 backdrop-blur-md rounded-full border border-surface/30 flex items-center justify-center">
                <Icon
                  name="play_arrow"
                  className="text-surface text-5xl"
                />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="flex items-center gap-4 text-surface">
                <Icon name="play_circle" className="text-2xl" />
                <div className="flex-grow h-1 bg-surface/30 rounded-full overflow-hidden">
                  <div className="w-1/3 h-full bg-accent-gold" />
                </div>
                <span className="text-mono-md">01:24 / 04:00</span>
                <Icon name="volume_up" className="text-2xl" />
                <Icon name="fullscreen" className="text-2xl" />
              </div>
            </div>
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
            <div className="w-12 h-1 bg-accent-gold rounded-full my-8" />
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
