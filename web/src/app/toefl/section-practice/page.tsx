import { Suspense } from "react";
import { BackLink, Container, SiteFooter, SiteHeader } from "@/components/ui";
import { SectionPracticeClient } from "@/components/toefl/SectionPracticeClient";

export default function ToeflSectionPracticePage() {
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
          <h1 className="text-headline-xl text-primary mb-16">
            Section Practice
          </h1>
          <Suspense fallback={null}>
            <SectionPracticeClient />
          </Suspense>
        </Container>
      </main>
      <SiteFooter siteName="Let's get that 120" />
    </div>
  );
}
