import { Button, Container, Icon, SiteFooter } from "@/components/ui";

export default function LandingPage() {
  return (
    <div className="flex flex-col flex-1">
      <header className="w-full sticky top-0 z-50 bg-surface-container-lowest border-b border-outline-variant">
        <Container className="h-16 flex items-center justify-between">
          <span className="text-headline-md font-bold text-primary tracking-tight">
            Let&apos;s get that Score
          </span>
          <Button href="/exam-select" className="px-6 py-2">
            Start Practice
          </Button>
        </Container>
      </header>

      <main className="flex-grow flex flex-col justify-center py-16 md:py-24">
        <Container>
          <div className="max-w-[720px]">
            <h1 className="text-headline-lg-mobile md:text-headline-xl text-primary mb-6 leading-tight">
              TOEFL &amp; TOEIC practice, built like the real exam
            </h1>
            <p className="text-body-lg text-on-surface-variant mb-12">
              Practice with questions modeled after real exam patterns and
              formats, plus tools designed to mirror the actual test
              experience — timing, structure, and interface included.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/exam-select" className="px-10 py-4">
                Start Practice
              </Button>
            </div>

            <div className="mt-16 flex items-center gap-4 opacity-40">
              <div className="h-px bg-outline-variant flex-grow" />
              <div className="flex items-center gap-2 text-mono-md uppercase tracking-widest text-outline">
                <Icon name="verified" className="text-[18px]" />
                Professional Standards
              </div>
              <div className="h-px bg-outline-variant flex-grow" />
            </div>
          </div>
        </Container>
      </main>

      <SiteFooter siteName="Let's get that Score" />
    </div>
  );
}
