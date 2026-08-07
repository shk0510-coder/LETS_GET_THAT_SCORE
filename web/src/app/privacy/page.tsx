import { Metadata } from "next";
import { Container, SiteFooter, SiteHeader } from "@/components/ui";
import { formatKoreanDate } from "@/lib/formatDate";

export const metadata: Metadata = {
  title: "개인정보처리방침 — Let's Get That Score",
  description: "Let's get that Score 개인정보처리방침입니다.",
};

export default function PrivacyPage() {
  const effectiveDate = formatKoreanDate(new Date());

  return (
    <div className="flex flex-col flex-1">
      <SiteHeader title="Let's get that Score" href="/" backHref="/" backLabel="Home" />

      <main className="flex-grow py-12 md:py-16">
        <Container>
          <article className="max-w-[720px] mx-auto">
            <h1 className="text-headline-lg text-primary mb-2">개인정보처리방침</h1>
            <p className="text-body-sm text-on-surface-variant mb-10">시행일: {effectiveDate}</p>

            <p className="text-body-md text-on-surface-variant leading-relaxed mb-10">
              Let&apos;s get that Score(이하 &ldquo;사이트&rdquo;)는 이용자의 개인정보를 중요하게
              생각하며, 아래와 같이 개인정보처리방침을 안내합니다.
            </p>

            <div className="flex flex-col gap-10">
              <section>
                <h2 className="text-body-lg font-semibold text-primary mb-3">
                  1. 수집하는 개인정보 항목
                </h2>
                <p className="text-body-md text-on-surface-variant leading-relaxed mb-3">
                  사이트는 별도의 회원가입 절차를 운영하지 않으며, 이용자로부터 직접 개인정보를
                  수집하지 않습니다. 다만, 아래와 같은 정보가 자동으로 수집될 수 있습니다.
                </p>
                <ul className="list-disc pl-5 flex flex-col gap-1 text-body-md text-on-surface-variant leading-relaxed">
                  <li>접속 기기 정보(브라우저 종류, 운영체제 등)</li>
                  <li>접속 로그, 방문 일시, 서비스 이용 기록</li>
                  <li>쿠키(Cookie)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-body-lg font-semibold text-primary mb-3">
                  2. 개인정보 수집 목적
                </h2>
                <p className="text-body-md text-on-surface-variant leading-relaxed">
                  자동으로 수집되는 정보는 서비스 이용 통계 분석, 서비스 개선을 위한 목적으로만
                  활용됩니다.
                </p>
              </section>

              <section>
                <h2 className="text-body-lg font-semibold text-primary mb-3">
                  3. 쿠키(Cookie)의 사용
                </h2>
                <p className="text-body-md text-on-surface-variant leading-relaxed">
                  사이트는 이용자에게 맞춤화된 광고 등을 제공하기 위해 쿠키를 사용할 수 있습니다.
                  이용자는 웹브라우저 설정을 통해 쿠키 저장을 거부하거나 삭제할 수 있습니다.
                </p>
              </section>

              <section>
                <h2 className="text-body-lg font-semibold text-primary mb-3">
                  4. 제3자 광고 서비스 (Google AdSense)
                </h2>
                <p className="text-body-md text-on-surface-variant leading-relaxed mb-3">
                  사이트는 Google을 포함한 제3자 광고 서비스를 이용하여 광고를 게재할 수 있습니다.
                </p>
                <ul className="list-disc pl-5 flex flex-col gap-1 text-body-md text-on-surface-variant leading-relaxed">
                  <li>
                    Google 등 제3자 광고 제공업체는 쿠키를 사용하여 이용자가 본 사이트 및 다른
                    사이트를 방문한 기록을 바탕으로 관심사 기반 광고를 게재할 수 있습니다.
                  </li>
                  <li>
                    이용자는 Google 광고 설정(
                    <a
                      href="https://adssettings.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      adssettings.google.com
                    </a>
                    )에서 맞춤 광고를 원하지 않을 경우 이를 비활성화할 수 있습니다.
                  </li>
                  <li>
                    제3자 광고 제공업체의 쿠키 사용에 대한 자세한 내용은 해당 업체의
                    개인정보처리방침을 참고하시기 바랍니다.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-body-lg font-semibold text-primary mb-3">
                  5. 개인정보의 보유 및 이용 기간
                </h2>
                <p className="text-body-md text-on-surface-variant leading-relaxed">
                  사이트는 개인정보를 별도로 수집·저장하지 않으므로, 자동 수집되는 접속 로그 등은
                  서비스 운영 목적 달성 후 합리적인 기간 내에 파기됩니다.
                </p>
              </section>

              <section>
                <h2 className="text-body-lg font-semibold text-primary mb-3">6. 이용자의 권리</h2>
                <p className="text-body-md text-on-surface-variant leading-relaxed">
                  이용자는 언제든지 쿠키 설정 변경을 통해 개인정보 수집을 거부할 수 있으며, 이
                  경우 서비스 이용에 일부 제한이 있을 수 있습니다.
                </p>
              </section>

              <section>
                <h2 className="text-body-lg font-semibold text-primary mb-3">
                  7. 개인정보 보호책임자 및 문의
                </h2>
                <p className="text-body-md text-on-surface-variant leading-relaxed">
                  개인정보 처리에 관한 문의사항은 아래 이메일로 연락 주시기 바랍니다.
                  <br />
                  이메일:{" "}
                  <a href="mailto:shk0510@gmail.com" className="text-primary hover:underline">
                    shk0510@gmail.com
                  </a>
                </p>
              </section>

              <section>
                <h2 className="text-body-lg font-semibold text-primary mb-3">8. 방침의 변경</h2>
                <p className="text-body-md text-on-surface-variant leading-relaxed">
                  이 개인정보처리방침은 법령 및 서비스 변경사항에 따라 개정될 수 있으며, 개정 시
                  사이트 내 공지를 통해 안내합니다.
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
