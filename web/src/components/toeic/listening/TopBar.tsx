import { BackLink, Container, Icon } from "@/components/ui";

export function TopBar({
  testNumber,
  partLabel,
  timeLeftSeconds,
  sectionHref,
}: {
  testNumber: number;
  partLabel: string;
  timeLeftSeconds: number;
  sectionHref: string;
}) {
  const mm = String(Math.floor(timeLeftSeconds / 60)).padStart(2, "0");
  const ss = String(timeLeftSeconds % 60).padStart(2, "0");

  return (
    <header className="sticky top-0 z-20 w-full bg-surface border-b border-outline-variant">
      <Container className="h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <BackLink href={sectionHref} label="Back" />
          <h1 className="text-headline-md font-bold text-primary truncate">
            TOEIC Listening Test {testNumber}
          </h1>
        </div>
        <div className="flex items-center gap-3 md:gap-5 shrink-0">
          <span className="hidden sm:inline-block rounded-full bg-secondary-container px-3 py-1 text-label-md text-on-secondary-container">
            {partLabel}
          </span>
          <span className="inline-flex items-center gap-1.5 text-mono-md font-bold text-primary">
            <Icon name="timer" className="text-[18px]" />
            {mm}:{ss}
          </span>
        </div>
      </Container>
    </header>
  );
}
