import { Metadata } from "next";
import { Container, SiteFooter, SiteHeader } from "@/components/ui";
import { formatKoreanDate } from "@/lib/formatDate";

export const metadata: Metadata = {
  title: "이용약관 — Let's Get That Score",
  description: "Let's get that Score 이용약관입니다.",
};

export default function TermsPage() {
  const effectiveDate = formatKoreanDate(new Date());

  return (
    <div className="flex flex-col flex-1">
      <SiteHeader title="Let's get that Score" href="/" backHref="/" backLabel="Home" />

      <main className="flex-grow py-12 md:py-16">
        <Container>
          <article className="max-w-[720px] mx-auto">
            <h1 className="text-headline-lg text-primary mb-2">이용약관</h1>
            <p className="text-body-sm text-on-surface-variant mb-10">시행일: {effectiveDate}</p>

            <div className="flex flex-col gap-10">
              <section>
                <h2 className="text-body-lg font-semibold text-primary mb-3">제1조 (목적)</h2>
                <p className="text-body-md text-on-surface-variant leading-relaxed">
                  이 약관은 Let&apos;s get that Score(이하 &ldquo;사이트&rdquo;)가 제공하는 서비스의
                  이용과 관련하여 사이트와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로
                  합니다.
                </p>
              </section>

              <section>
                <h2 className="text-body-lg font-semibold text-primary mb-3">제2조 (서비스의 내용)</h2>
                <p className="text-body-md text-on-surface-variant leading-relaxed">
                  사이트는 TOEFL 및 TOEIC 시험 대비 연습 문제, 학습 콘텐츠를 무료로 제공합니다.
                  사이트에서 제공하는 문제는 실제 시험 기관(ETS 등)과 무관하게 자체 제작된 연습용
                  콘텐츠이며, 실제 시험과 형식이 유사할 수 있으나 동일하지 않을 수 있습니다.
                </p>
              </section>

              <section>
                <h2 className="text-body-lg font-semibold text-primary mb-3">제3조 (회원가입)</h2>
                <p className="text-body-md text-on-surface-variant leading-relaxed">
                  현재 사이트는 별도의 회원가입 절차 없이 누구나 이용할 수 있습니다.
                </p>
              </section>

              <section>
                <h2 className="text-body-lg font-semibold text-primary mb-3">제4조 (이용자의 의무)</h2>
                <p className="text-body-md text-on-surface-variant leading-relaxed mb-3">
                  이용자는 사이트를 이용함에 있어 다음 행위를 하여서는 안 됩니다.
                </p>
                <ol className="list-decimal pl-5 flex flex-col gap-1 text-body-md text-on-surface-variant leading-relaxed">
                  <li>사이트의 콘텐츠를 무단으로 복제, 배포, 상업적으로 이용하는 행위</li>
                  <li>사이트의 정상적인 운영을 방해하는 행위</li>
                  <li>관련 법령을 위반하는 행위</li>
                </ol>
              </section>

              <section>
                <h2 className="text-body-lg font-semibold text-primary mb-3">제5조 (지적재산권)</h2>
                <p className="text-body-md text-on-surface-variant leading-relaxed">
                  사이트에 게시된 모든 콘텐츠(문제, 텍스트, 디자인 등)에 대한 저작권은 사이트
                  운영자에게 있으며, 사전 동의 없이 무단으로 사용할 수 없습니다.
                </p>
              </section>

              <section>
                <h2 className="text-body-lg font-semibold text-primary mb-3">제6조 (광고 게재)</h2>
                <p className="text-body-md text-on-surface-variant leading-relaxed">
                  사이트는 서비스 운영을 위해 제3자(Google 등)의 광고를 게재할 수 있습니다. 광고
                  게재와 관련한 사항은 개인정보처리방침을 따릅니다.
                </p>
              </section>

              <section>
                <h2 className="text-body-lg font-semibold text-primary mb-3">제7조 (면책조항)</h2>
                <p className="text-body-md text-on-surface-variant leading-relaxed">
                  사이트는 무료로 제공되는 학습 콘텐츠에 대해 정확성을 위해 노력하나, 이용자가
                  콘텐츠를 통해 얻은 학습 결과나 실제 시험 성적에 대해 어떠한 보증도 하지 않습니다.
                </p>
              </section>

              <section>
                <h2 className="text-body-lg font-semibold text-primary mb-3">제8조 (약관의 변경)</h2>
                <p className="text-body-md text-on-surface-variant leading-relaxed">
                  이 약관은 필요 시 개정될 수 있으며, 개정 시 사이트 내 공지를 통해 안내합니다.
                </p>
              </section>

              <section>
                <p className="text-body-md text-on-surface-variant leading-relaxed">
                  문의:{" "}
                  <a href="mailto:shk0510@gmail.com" className="text-primary hover:underline">
                    shk0510@gmail.com
                  </a>
                </p>
              </section>
            </div>
          </article>
        </Container>
      </main>

      <SiteFooter siteName="Let's get that Score" />
    </div>
  );
}
