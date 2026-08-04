import { Container, NumberedActionCard, SiteFooter, SiteHeader } from "@/components/ui";

export default function ToeflHomePage() {
  return (
    <div className="flex flex-col flex-1">
      <SiteHeader
        title="Let's get that 120"
        subtitle="TOEFL practice, built like the real exam"
        href="/toefl"
        backHref="/exam-select"
      />
      <main className="flex-grow flex items-center justify-center">
        <Container className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <NumberedActionCard
              number="01"
              title="Section Practice"
              description="Practice one section at a time: Reading, Listening, Writing, Speaking"
              cta="CHOOSE SECTION"
              href="/toefl/section-practice"
            />
            <NumberedActionCard
              number="02"
              title="Practice by Type"
              description="Drill a specific question type"
              cta="BROWSE TYPES"
              href="/toefl/practice-by-type"
            />
          </div>
        </Container>
      </main>
      <SiteFooter siteName="Let's get that 120" />
    </div>
  );
}
