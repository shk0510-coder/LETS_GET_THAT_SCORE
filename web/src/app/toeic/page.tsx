import { Container, NumberedActionCard, SiteFooter, SiteHeader } from "@/components/ui";

export default function ToeicHomePage() {
  return (
    <div className="flex flex-col flex-1">
      <SiteHeader
        title="Let's get that 990"
        subtitle="TOEIC practice, built like the real exam"
        href="/toeic"
        backHref="/exam-select"
      />
      <main className="flex-grow flex items-center justify-center">
        <Container className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <NumberedActionCard
              number="01"
              title="Section Practice"
              description="Take a full Listening or Reading section under timed conditions."
              cta="VIEW TESTS"
              href="/toeic/section-practice"
            />
            <NumberedActionCard
              number="02"
              title="Practice by Type"
              description="Focus on specific question parts to master individual skill sets."
              cta="PRACTICE"
              href="/toeic/practice-by-type"
            />
          </div>
        </Container>
      </main>
      <SiteFooter siteName="Let's get that 990" />
    </div>
  );
}
