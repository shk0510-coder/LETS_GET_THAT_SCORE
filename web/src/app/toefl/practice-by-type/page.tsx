import { BackLink, Container, SiteFooter, SiteHeader } from "@/components/ui";
import { PracticeByTypeClient } from "@/components/toefl/PracticeByTypeClient";

export default function ToeflPracticeByTypePage() {
  return (
    <div className="flex flex-col flex-1">
      <SiteHeader
        title="Let's get that 120"
        subtitle="TOEFL practice, built like the real exam"
        href="/toefl"
      />
      <main className="flex-grow">
        <Container className="py-12">
          <div className="mb-8">
            <BackLink href="/toefl" label="Home" />
          </div>
          <h1 className="text-headline-lg text-primary mb-10">
            Practice by Type
          </h1>
          <PracticeByTypeClient />
        </Container>
      </main>
      <SiteFooter siteName="Let's get that 120" />
    </div>
  );
}
