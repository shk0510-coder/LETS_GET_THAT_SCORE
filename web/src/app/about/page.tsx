import { Metadata } from "next";
import { Container, SiteFooter, SiteHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "About — Let's Get That Score",
  description: "About Let's get that Score, a TOEFL & TOEIC practice platform.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col flex-1">
      <SiteHeader title="Let's get that Score" href="/" backHref="/" backLabel="Home" />

      <main className="flex-grow py-12 md:py-16">
        <Container>
          <article className="max-w-[720px] mx-auto">
            <h1 className="text-headline-lg text-primary mb-8">About Let&apos;s get that Score</h1>

            <div className="flex flex-col gap-6 text-body-md text-on-surface-variant leading-relaxed">
              <p>
                Let&apos;s get that Score는 TOEFL과 TOEIC을 준비하는 학습자를 위해 실제 시험과 최대한
                비슷한 환경에서 연습할 수 있도록 만든 학습 플랫폼입니다.
              </p>
              <p>
                시험지의 구성, 문항 배치, 진행 방식을 실제 시험과 유사하게 구현하여, 학습자가 시험
                당일 화면에 낯설어하지 않고 문제 자체에 집중할 수 있도록 돕는 것을 목표로 합니다.
              </p>
              <p>
                현재 TOEFL Reading, Listening과 TOEIC Listening, Reading 연습 콘텐츠를 제공하고
                있으며, 앞으로 더 많은 파트와 유형을 지속적으로 추가해 나갈 예정입니다.
              </p>
              <p>
                문의사항이나 제안이 있으시면 아래 이메일로 연락 주세요.
                <br />
                <a href="mailto:shk0510@gmail.com" className="text-primary hover:underline">
                  shk0510@gmail.com
                </a>
              </p>
            </div>
          </article>
        </Container>
      </main>

      <SiteFooter siteName="Let's get that Score" />
    </div>
  );
}
